import "../styles/index.scss";


const hotelsDOM = document.querySelector('.itemHolder');
const starBtn = document.querySelector('.star');
const priceLow = document.querySelector('.priceLow');
const priceHigh = document.querySelector('.priceHigh');
const listTop = document.querySelector('.listTop');
const menu = document.querySelector('.fa-bars');
const headerCenter = document.querySelector('.header-center');
const close = document.querySelector('.fa-times');

let hotelList=[];

//Getting the hotels
class Hotels {
    async getHotels() {
        const response = await fetch('http://fake-hotel-api.herokuapp.com/api/hotels');
        const data = await response.json();
        let hotels = data.map(hotel =>{
            const {id, name, country, city, price, images, stars, rating, description} = hotel;
            return {id, name, country, city, price, images, stars, rating, description};
        })
        return hotels;                           
    }
    
}
//Display hotels
class UI {
    displayHotels(data){
        let result="";
        data.filter(hotel=>{
            return hotel.stars>=3;
        }).map(hotel => {
            result+= this.displayItems(hotel);
            hotelsDOM.innerHTML=result;
         });
        this.count(data);
    }

    sortHotels(data) {
        let result="";
        data.sort((a,b)=>{
            return b.stars - a.stars;
        }).map(hotel => {
            result+= this.displayItems(hotel);
            hotelsDOM.innerHTML=result;
         });
        this.count(data);
    }

    sortPriceHL(data) {
        let result="";
        data.sort((a,b)=>{
            return b.price - a.price;
        }).map(hotel => {
            result+= this.displayItems(hotel);
            hotelsDOM.innerHTML=result;
         });
        this.count(data);
    }

    sortPriceLH(data) {
        let result="";
        data.sort((a,b)=>{
            return a.price - b.price;
        }).map(hotel => {
            result+= this.displayItems(hotel);
            hotelsDOM.innerHTML=result;
         });
        this.count(data);
    }

    displayItems(hotel){
         return `
            <div class="item">
            <div class="imageHolder">
              <img src=${hotel.images[0]} alt="" >
            </div>
            <div class="detail">
              <h2>${hotel.name}</h2>
              <p class="place">${hotel.city}, ${hotel.country}</p>
              <p class="discription">
              ${hotel.description}
              </p>
            </div>
            <div class="rate">
              <div class="star">
                  <i class="${(1<=hotel.stars) ? 'fas': 'far'} fa-star"></i>
                  <i class="${(2<=hotel.stars) ? 'fas': 'far'} fa-star"></i>
                  <i class="${(3<=hotel.stars) ? 'fas': 'far'} fa-star"></i>
                  <i class="${(4<=hotel.stars) ? 'fas': 'far'} fa-star"></i>
                  <i class="${(5<=hotel.stars) ? 'fas': 'far'} fa-star"></i>
              </div>
              <div class="price">$${hotel.price}</div>
              <div class="review">Review:  <span>${parseFloat(hotel.rating).toFixed(2)}</span></div>
              <div class="bookNow">Book Now</div>
            </div>
          </div>
            `        
    }
    count(data){
        let listTotal = data.length>0 ? `${data.length} hotels found`: `No hotels found`;
        listTop.innerHTML= listTotal;
    }
    
}

//local storage
class Storage {
    static saveHotels(hotels) {
        localStorage.setItem("hotels", JSON.stringify(hotels));
    }
    static getHotels() {
        return localStorage.getItem('hotels')?JSON.parse(localStorage.getItem('hotels')):[];
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const hotels = new Hotels();
    hotels.getHotels().then(data=>{
        ui.displayHotels(data);
        Storage.saveHotels(data);
    })
    
})
starBtn.addEventListener("click", ()=>{
    const ui = new UI();
    hotelList= Storage.getHotels();
    ui.sortHotels(hotelList);
    starBtn.classList.add("filterSelect");
    priceLow.classList.remove("filterSelect");
    priceHigh.classList.remove("filterSelect");
})
priceLow.addEventListener("click", ()=>{
    const ui = new UI();
    hotelList= Storage.getHotels();
    ui.sortPriceLH(hotelList);
    starBtn.classList.remove("filterSelect");
    priceLow.classList.add("filterSelect");
    priceHigh.classList.remove("filterSelect");
})
priceHigh.addEventListener("click", ()=>{
    const ui = new UI();
    hotelList= Storage.getHotels();
    ui.sortPriceHL(hotelList);
    starBtn.classList.remove("filterSelect");
    priceLow.classList.remove("filterSelect");
    priceHigh.classList.add("filterSelect");
})
menu.addEventListener("click", ()=>{
    headerCenter.classList.add("headerEnhance");
})
close.addEventListener("click", ()=>{
    headerCenter.classList.remove("headerEnhance");
})