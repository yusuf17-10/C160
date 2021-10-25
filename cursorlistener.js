AFRAME.registerComponent('cursor-listener', {
    schema:{
        selecterItemId : {default:"",type:"string"}
        
    },

    init:function(){
        this.handleMouseEnterEvent()
        this.handleMouseLeaveEvent()
        this.handleClickEvent()
    },

    handlePlacesListState:function(){
        var id = this.el.getAttribute("id")
        var placesId = ["taj-mahal","budapest","eiffel-tower","new-york-city"]
        if(placesId.includes(id)){
            var placesContainer = document.querySelector("#places-container")
            placesContainer.setAttribute('cursor-listener',{
                selecterItemId:id
            })
            this.el.setAttribute("material",{
                color:"#fffaa2",
                opacity:1
            })
        }
    },
    
    handleClickEvent:function(){
        this.el.addEventListener("click",(evt)=>{
            const placesContainer = document.querySelector("#places-container")
            const {state} = placesContainer.getAttribute("tour")
            if(state == "places-list"){
                const id = this.el.getAttribute("id")
                var placesId = ["taj-mahal","budapest","eiffel-tower","new-york-city"]
                if(placesId.includes(id)){
                    placesContainer.setAttribute("tour",{state:"view",selected_card:id})
                }
            } 
            if (state == "view"){
                this.handleViewState()
            }
            if(state == "change-view"){
                this.handleViewState()
            }
        })
    },

    handleViewState:function(){
        const id = this.el.getAttribute("id")
        const places_container = document.querySelector("#places-container")
        const {selecterItemId} = places_container.getAttribute("cursor-listener")
        const side_view_places_id = ["place-1","place-2","place-3","place-4"]
        if(side_view_places_id.includes(id)){
            places_container.setAttribute("tour",{state:"change-view"})
            const skyel = document.querySelector("#sky-background")
            skyel.setAttribute("material",{src:`./assets/360_images/${selecterItemId}/${id}.jpg`,color:"ffffff"})
        }
    },

    handleMouseEnterEvent:function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlacesListState()
        })
    },

    handleMouseLeaveEvent:function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selecterItemId} = this.data
            if(selecterItemId){
                const el = document.querySelector(`#${selecterItemId}`)
                const id = el.getAttribute("id")
                if(id == selecterItemId){
                    el.setAttribute("material",{
                        color:"#aaaaa6",
                        opacity:1
                    })        
                }
            }
        })
    }

});
