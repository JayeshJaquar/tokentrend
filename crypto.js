 document.getElementById("div5").addEventListener("click", () => {
      document.getElementById("hometitle").scrollIntoView({ behavior: "smooth"});
      document.getElementById("div5").classList.add("back_ground");
      window.addEventListener("scroll", () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
      document.getElementById("div5").classList.remove("back_ground");}, 150);
});})
document.getElementById("div2").addEventListener("click", () => {
      document.getElementById("hometitle").scrollIntoView({ behavior: "smooth"});
      document.getElementById("div2").classList.add("back_ground");
      window.addEventListener("scroll", () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
      document.getElementById("div2").classList.remove("back_ground");}, 150);
});})
document.getElementById("div3").addEventListener("click", () => {
      document.getElementById("table").scrollIntoView({ behavior: "smooth"});
      document.getElementById("div3").classList.add("back_ground");
      window.addEventListener("scroll", () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
      document.getElementById("div3").classList.remove("back_ground");}, 150);
});})

document.getElementById("div7").addEventListener("click", () => {
    
    document.getElementById("div7").classList.add("back_ground");

  
    setTimeout(() => {
        window.location.href = "coin-details.html";
    }, 150);
});
document.getElementById("div6").addEventListener("click", () => {
      document.getElementById("footer").scrollIntoView({ behavior: "smooth"});
      document.getElementById("div6").classList.add("back_ground");
      window.addEventListener("scroll", () => {
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
      document.getElementById("div6").classList.remove("back_ground");}, 150);
});})
document.getElementById("use").addEventListener("click", () => {
    
  
    setTimeout(() => {
        window.location.href = "use.html";
    }, 150);
});
document.getElementById("privacy").addEventListener("click", () => {
    
  
    setTimeout(() => {
        window.location.href = "privacy.html";
    }, 150);
});
document.getElementById("cookie").addEventListener("click", () => {
    
  
    setTimeout(() => {
        window.location.href = "cookie.html";
    }, 150);
});
document.getElementById("source").addEventListener("click", () => {
    
  
    setTimeout(() => {
        window.location.href = "data_sources.html";
    }, 150);
});

let currentCurrency = "USD"; 
let allCoins = [];


document.getElementById("usdinr").addEventListener("click", async () => {
   
    currentCurrency = (currentCurrency === "USD") ? "INR" : "USD";
    
    
    document.getElementById("usdinr").innerText = currentCurrency;
    
    await fetchMarketData(currentCurrency);
});

async function fetchMarketData(currency = 'USD') {
    const tableBody = document.getElementById('market-body');
    if (!tableBody) return;

  
    const apiCurrency = currency.toLowerCase();
  
    const symbol = (apiCurrency === 'inr') ? '₹' : '$';

    tableBody.innerHTML = `<tr><td colspan='5' style='text-align:center;'>Loading ${currency} Data...</td></tr>`;

    try {
       
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${apiCurrency}&order=market_cap_desc&per_page=15&page=1&sparkline=false`);
        
        if (!response.ok) throw new Error("API Limit reached. Wait 30 seconds.");
        
        const data = await response.json();
        allCoins = data;
        tableBody.innerHTML = ""; 

        data.forEach((coin, index) => {
            const priceChange = coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "0.00";
            const changeClass = parseFloat(priceChange) >= 0 ? 'up' : 'down';

            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td class="coin-cell" style="display:flex; align-items:center; gap:15px;">
                        <img src="${coin.image}" class="coin-icon" width="50" height="50">
                        <span>${coin.name} - ${coin.symbol.toUpperCase()}</span>
                    </td>
                    <td>${symbol}${coin.current_price.toLocaleString()}</td>
                    <td class="${changeClass}">${priceChange}%</td>
                    <td>${symbol}${coin.market_cap.toLocaleString()}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan='5' style='color:red; text-align:center;'>${error.message}</td></tr>`;
    }
}


window.onload = () => {
    fetchMarketData('USD');
    fetchAllCoinsForSearch();
};
const searchInput = document.getElementById("input");
const suggestionsPanel = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
    const inputText = searchInput.value.toLowerCase();
    suggestionsPanel.innerHTML = ""; 
    
    if (inputText.length > 0) {
        const filtered = allCoins.filter(coin => 
            coin.name.toLowerCase().includes(inputText) || 
            coin.symbol.toLowerCase().includes(inputText)
        );

        if (filtered.length > 0) {
            suggestionsPanel.style.display = "block";
            filtered.forEach(coin => {
                const item = document.createElement("div");
                item.className = "suggestion-item";
                item.innerHTML = `
                    <img src="${coin.image}" width="20">
                    <span>${coin.name}</span>
                `;
                
               
                item.addEventListener("click", () => {
                    searchInput.value = coin.name;
                    suggestionsPanel.style.display = "none";
                });
                suggestionsPanel.appendChild(item);
            });
        } else {
            suggestionsPanel.style.display = "none";
        }
    } else {
        suggestionsPanel.style.display = "none";
    }
});


document.getElementById("buttonid").addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const foundCoin = allCoins.find(c => c.name.toLowerCase() === query);

    if (foundCoin) {window.location.href = `coin-details.html?id=${foundCoin.id}`;
    } else {
        alert("Please select a valid coin from the list!");
    }
});