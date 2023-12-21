window.onload = function () {
    // PDF.js code
    const pdfCanvas = document.getElementById('pdf-canvas');
    // if pdfCanvas is null, it means we are not authorized to view the book
    // go to the logic of image resizing and rating
    if (pdfCanvas !== null) {
        const url = pdfCanvas.getAttribute('data-pdf-url');
        console.log(url);
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        let pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 1.5,
            canvasContext = pdfCanvas.getContext('2d');

        /**
         * Get page info from document, resize canvas accordingly, and render page.
         * @param num Page number.
         */
        function renderPage(num) {
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
                const viewport = page.getViewport({ scale: scale });
                pdfCanvas.height = viewport.height;
                pdfCanvas.width = viewport.width;

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: canvasContext,
                    viewport: viewport,
                };
                const renderTask = page.render(renderContext);

                // Wait for rendering to finish
                renderTask.promise.then(function () {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        // New page rendering is pending
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            // Update page counters
            document.getElementById('page_num').textContent = num;
        }

        /**
         * If another page rendering in progress, waits until the rendering is
         * finished. Otherwise, executes rendering immediately.
         */
        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        /**
         * Displays previous page.
         */
        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }

        /**
         * Displays next page.
         */
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }

        // Event listeners for the previous and next page buttons
        document.getElementById('prev').addEventListener('click', onPrevPage);
        document.getElementById('next').addEventListener('click', onNextPage);

        // Asynchronously downloads PDF
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(function (pdf) {
            pdfDoc = pdf;
            document.getElementById('page_count').textContent = pdf.numPages;

            // Initial/first page rendering
            renderPage(pageNum);
        });
    }
    
};
