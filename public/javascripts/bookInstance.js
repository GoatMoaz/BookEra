window.onload = function () {
    const canvas = document.getElementById('pdf-canvas');
    const url = canvas.getAttribute('data-pdf-url');

    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded');

        const pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
            console.log('Page loaded');

            const scale = 1.5;
            const viewport = page.getViewport({scale: scale});

            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });
    }, function (reason) {
        console.error(reason);
    });
}
const button = document.querySelector(".cart");
const done = document.querySelector(".done");
console.log(button);
let added = false;
button.addEventListener('click',()=>{
    if(added){
        done.style.transform = "translate(-110%) skew(-40deg)";
        added = false;
    }
    else{
        done.style.transform = "translate(0px)";
        added = true;
    }

});
