function loadLinkClick(){
    var links= document.getElementsByTagName("a");
    const headers = new Headers();
    console.log(links.length+" adet link bulundu.");
    for (var i=0;i<links.length;i++){
       
            links[i].addEventListener("click",function(e){
            let href=e.currentTarget.href;
                 if(href.startsWith(location.origin) || href.startsWith("/")){
                    console.log("href",href)
                    NProgress.start();
                    fetch(href,{method:"GET",headers}).then(res=>res.text()).then(result=>{
                        processAjaxData(result,href);
                        NProgress.done();
                    });
                    e.preventDefault();
                }
                     
            })
       
    }
    
} 


function processAjaxData(response, urlPath){
    var dd = new diffDOM.DiffDOM();
    var html1=document.documentElement;
    var parser = new DOMParser();
    var html2 = parser.parseFromString(response, "text/html");
    // Sadece değişen kısımları bulmak için diffDOM kullan
    var diff = dd.diff(html1, html2.documentElement);
    // Değişiklikleri uygula
    dd.apply(html1, diff)
    document.title = html2.title;
    document.documentElement.replaceWith(html1);
    window[urlPath]=html1.outerHTML;
    var data={"Title":html2.title,"Url":urlPath};
    console.log("data");
    console.log(data);
   
    window.history.pushState(data,"", urlPath);
    window.scrollTo({top: 0, behavior: "smooth"});
    
}

window.onpopstate = function(e){
    if(e.state){
        var html = window[e.state.Url];
        var parser = new DOMParser();
        var domHtml = parser.parseFromString(html, "text/html");
        document.body.replaceWith(domHtml.body);
        document.title = e.state.Title;
        window.scrollTo({top: 0, behavior: "smooth"});
        loadLinkClick();
    }
};


addEventListener("load",function(){
    loadLinkClick();
    window[location.href]=document.documentElement.outerHTML;

     // Yeni eklenen linkleri izlemek için bir MutationObserver oluştur
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Eğer yeni bir node eklendiyse
            if (mutation.addedNodes.length > 0) {
                // Node'un bir link olup olmadığını kontrol et
                var node = mutation.addedNodes[0];
                if (node.tagName === "A") {
                    // Link'e event listener ekle
                    node.addEventListener("click",function(e){
                        let href=e.currentTarget.href;
                        if(href.startsWith(location.origin) || href.startsWith("/")){
                            console.log("href",href)
                            NProgress.start();
                            fetch(href,{method:"GET",headers}).then(res=>res.text()).then(result=>{
                                processAjaxData(result,href);
                                NProgress.done();
                            });
                            e.preventDefault();
                        }
                    })
                }
            }
        });
    });
    // Tüm document'i izlemek için observer'ı başlat
    observer.observe(document, { childList: true, subtree: true });
});
