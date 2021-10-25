AFRAME.registerComponent('side-view', {
    schema: {
        
    },

    init: function () {
        this.createPlaces()
    },
  

    createPlaceThumbnail :function(id,position){
        var entityel = document.createElement("a-entity")
        entityel.setAttribute("visible",true)
        entityel.setAttribute("id",`place-${id}`)
        entityel.setAttribute("geometry",{
            primitive:"circle",radius:2.5,
        })
        entityel.setAttribute("material",{src:"./assets/analysis.png",opacity:1})
        entityel.setAttribute("position",position)
        entityel.setAttribute("cursor-listener",{})
        return entityel
    },

    createPlaces:function(){
        const side_view_container = document.querySelector("#side-view-container")
        var previousXposition = -150
        var previousYposition = 30
        for(var i = 1;i<=4;i++){
            const position = {x:(previousXposition+=50),y:(previousYposition+=2),z:-40}
            const entityel = this.createPlaceThumbnail(i,position)
            side_view_container.appendChild(entityel)

        }
    },



    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
        const places_container = document.querySelector("#places-container")
        const {state} = places_container.getAttribute("tour")
        if(state == "view" || state == "change-view"){
            this.el.setAttribute("visible",true)
        }else{
            this.el.setAttribute("visible",false)
        }
    }
});
