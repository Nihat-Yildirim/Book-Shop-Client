const toastrPlugin = {
    install(app){
        const appComponent = document.querySelector("#app");
        const toastrIcons = [
            {
                name: "Success",
                element: '<i class="bi bi-check-lg"></i>'
            },
            {
                name: "Error",
                element: '<i class="bi bi-x"></i>'
            },
            {
                name: "Info",
                element: '<i class="bi bi-info-circle"></i>'
            },
            {
                name: "Warning",
                element: '<i class="bi bi-exclamation-circle"></i>'
            }
        ];
        let toastrId = 0;
        var toastrContainer = `<div id="toastr-container"></div>`;

        const addToastrElement = (message,bgColor,iconName,time) => {
            toastrId++;
            const container = document.querySelector("#toastr-container");
            const toastr = `
                <div class="toastr" id="toastr-${toastrId}">
                    <div class="toastr-icon-container">
                        ${toastrIcons.find(x => x.name == iconName).element}
                    </div>
                    <div>${message}</div>
                </div>
            `;
            
            if(container)
                container.insertAdjacentHTML("beforeend",toastr);

            if(!container){
                appComponent.insertAdjacentHTML("beforeend",toastrContainer);
                const addedContainer = document.querySelector("#toastr-container");
                addedContainer.insertAdjacentHTML("beforeend",toastr);
            }

            const addedToastr = document.querySelector("#toastr-"+toastrId);
            addedToastr.style.backgroundColor=bgColor;

            setTimeout(()=>{
                addedToastr.remove();
            },time);
        };

        app.config.globalProperties.$toastr = {
            success(message){
                addToastrElement(message,"#1E8449","Success",3500);
            },
            info(message){
                addToastrElement(message,"#2E86C1","Info",3500);
            },
            warning(message){
                addToastrElement(message,"#F39C12","Warning",3500);
            },
            error(message){
                addToastrElement(message,"#E74C3C","Error",3500);
            }
        }       
    }
}

export default toastrPlugin;