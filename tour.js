AFRAME.registerComponent('tour', {

    schema :{
        state:{default:"places-list",type:"string"},
        selected_card:{default:"#card1",type:"string"}
    },

    init: function () {
        this.placesContainer = this.el
        this.createCards()
    },


    createCards:function(){
        const thumbnailRef = [
            {
                id:"taj-mahal",
                title:"Taj Mahal",
                url:"./taj_mahal.png"
            },
            {
                id:"budapest",
                title:"Budapest",
                url:"./budapest.jpg"

            },
            {
                id:"eiffel-tower",
                title:"Eiffel Tower",
                url:"./eiffel_tower.jpg"

            },
            {
                id:"new-york-city",
                title:"New York City",
                url:"./new_york_city.png"

            }

        ]

    var previousXPosition = -60
    for(var item of thumbnailRef){
        console.log(item)
        var posX = previousXPosition+25
        var posY = 10
        var posZ = -40
        var position = {x:posX,y:posY,z:posZ}
        
        previousXPosition = posX
        const borderel = this.createBorders(position,item.id)
        const thumbnail = this.createThumbnail(item)
        borderel.appendChild(thumbnail)

        const titleel=this.createTitle(position,item)
        borderel.appendChild(titleel)
        this.placesContainer.appendChild(borderel)

    }
    },

    createBorders:function(position,id){
        const entityel = document.createElement("a-entity")
        entityel.setAttribute("id",id)
        entityel.setAttribute("visible",true)
        entityel.setAttribute("position",position)
        entityel.setAttribute("geometry",{
            primitive:"ring",
          
            radiusInner:9,radiusOuter:10
        })
        entityel.setAttribute("material",{color:"#0077cc",opacity:1})
        entityel.setAttribute("cursor-listener",{})
        return entityel
    },

    createThumbnail:function(item){
        console.log("Hello")
        const entityel = document.createElement("a-entity")
        entityel.setAttribute("visible",true)
        entityel.setAttribute("geometry",{
            primitive:"circle",
            radius:9
        })
        entityel.setAttribute("material",{src:item.url})
        return entityel

    },

    createTitle:function(position,item){
        const entityel = document.createElement("a-entity")
        entityel.setAttribute("visible",true)
        const elposition = position
        elposition.y = -20
        entityel.setAttribute("position",elposition)
        entityel.setAttribute("text",{
            font:"exo2bold",
            align:"center",
            width:70,
            value:item.title
        })
        return entityel
    },

    hideel:function(elList){
        elList.map((el)=>{
            el.setAttribute("visible",false)
        })
    },

    showView:function(){
        const {selected_card} = this.data
        const skyel = document.querySelector("#sky-background")
        skyel.setAttribute("material",{
            src:`./assets/360_images/${selected_card}/place-0.jpg`,
            color:"#ffffff"
        })

    },

    tick:function(){
        const {state} = this.el.getAttribute("tour")
        if(state == "view"){
            this.hideel([this.placesContainer])
            this.showView()
        }
    }

});

