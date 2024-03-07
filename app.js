// Player infos
function showItems() {
  
  const url = "https://www.transfermarkt.com.tr/besiktas-jk/kader/verein/114/saison_id/2023/plus/1";


  fetch(url)
      .then(response => response.text())
      .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const fenerbahce = [];
          
  
  
          const table = doc.querySelector("table.items");
  
          if (!table) {
              console.log("Tablo bulunamadı.");
          } else {
              table.querySelectorAll("tr.odd, tr.even").forEach(row => {
                  const player = {};
  
                  player.name = row.querySelector(".inline-table .hauptlink a").textContent.trim() || null;
                  player.country = row.querySelector("img.flaggenrahmen").getAttribute("title") || null;
                  player.num = row.querySelector("td.zentriert").textContent.trim() || null;
                  player.age = row.querySelectorAll("td.zentriert")[1].textContent.trim() || null;
                  player.foot = row.querySelectorAll("td.zentriert")[4].textContent.trim() || null;
                  player.height = row.querySelectorAll("td.zentriert")[3].textContent.trim() || null;
                  player.flag = row.querySelectorAll("td.zentriert img")[0]?.getAttribute("src") || null;
                  player.position = row.querySelectorAll("td.posrela tr")[1].textContent.trim() || null;
                  const logoImg = doc.querySelector(".data-header__profile-container img");
                  player.teamLogo = logoImg?.getAttribute("src") || null;
                  console.log("Fenerbahçe logosunun URL'si:", player.teamLogo);


                  
                  
                
  
                   
                 
                  const imgElement = row.querySelector(".inline-table td img");
  const imgSrc = imgElement ? imgElement.getAttribute("data-src") : null;
  player.img = imgSrc;
  
  
                  
  
                  
  
  
                  fenerbahce.push(player);
              });
          }
  
          const playerBoxContainer = document.getElementById("player-container");
  
          fenerbahce.forEach(player => {
              const playerBox = document.createElement("div");
              playerBox.classList.add("player-box");
            
              playerBox.innerHTML = `
              <div class="card-main">
              <div class="card-header">
                <div class="card-header-bg">
                  <img  style="width: 25px;" src="${player.flag}" alt="Flag">
                  <img  style="width: 30px;" src="${player.teamLogo}" alt="Fenerbahçe">
                  <h3>${player.num}</h3>
                </div>
                <img class="card-image" src="${player.img}" alt="${player.name}"/>
              </div>
              <h4 class="card-name">${player.name}</h4>
              <div class="card-attributes">
                <div class="card-attribute">
                  <span class="card-attribute__name">Mevki</span>
                  <hr style="height: 1px; width: 50px; display: flex; align-items: center; justify-content: center; margin: auto">
                  <span  class="card-attribute__value" id="position">${player.position}</span>
                </div>
                <div class="card-attribute">
                  <span class="card-attribute__name">Ülke</span>
                  <hr style="height: 1px; width: 50px; display: flex; align-items: center; justify-content: center; margin: auto ">
                  <span class="card-attribute__value">${player.country}</span>
                </div>
                <div class="card-attribute">
                  <span class="card-attribute__name">Yaş</span>
                  <hr style="height: 1px; width: 50px; display: flex; align-items: center;"></hr>
                  <span style="font-size: 12px;" class="card-attribute__value">${player.age}</span>
                </div>
                <div class="card-attribute">
                  <span class="card-attribute__name">Ayak</span>
                  <hr style="height: 1px; width: 50px; display: flex; align-items: center;"></hr>
                  <span class="card-attribute__value">${player.foot}</span>
                </div>
                <div class="card-attribute">
                  <span class="card-attribute__name">Boy</span>
                  <hr style="height: 1px; width: 50px; display: flex; align-items: center;"></hr>
                  <span class="card-attribute__value">${player.height}</span>
                </div>
              </div>
            </div>
            
              `;
              playerBoxContainer.appendChild(playerBox);
          });
      })
     
          
      
      
      .catch(error => {
          console.log(`Error: ${error.message}`);
      });

// super-league_____

}

// Search ---------
const super_league_url = "https://www.transfermarkt.com.tr/super-lig/startseite/wettbewerb/TR1";

const xhr = new XMLHttpRequest();
xhr.open("GET", super_league_url, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xhr.responseText, "text/html");
        const teamList = [];

        const table = doc.querySelector("table.items");

        if (!table) {
            console.log("Tablo bulunamadı.");
        } else {
            table.querySelectorAll("tr.odd, tr.even").forEach(row => {
                const teamName = row.querySelector(".hauptlink.no-border-links").textContent.trim() || null;
                teamList.push(teamName);
            });

            // Takım listesini kullanarak HTML içeriği oluştur
            const teamListDiv = document.getElementById('teamList');

            const dropDiv = document.querySelector('.drop');

            

            teamList.forEach(teamName => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('option');
                optionDiv.setAttribute('data-value', teamName.toLowerCase().replace(/\s/g, ''));

                const li = document.createElement('li');
                li.innerHTML = `
                
                ${teamName}
                
              
                `;
              

                optionDiv.appendChild(li);

                dropDiv.appendChild(optionDiv);
            });

            teamListDiv.appendChild(dropDiv);
              
        }
    }
};
xhr.send();


const searchInput = document.querySelector("#plyr-input");

searchInput.addEventListener("input", function (e) {
    const playerNames = document.querySelectorAll(".card-name");
    const search = searchInput.value.toLowerCase();

    playerNames.forEach(function (item) {
        const playerName = item.textContent.toLowerCase();
        const parentElement = item.closest('.player-box'); 

        parentElement.style.display = 'block'; 

        if (!playerName.includes(search)) {
            parentElement.style.display = "none"; 
        }
    });
});







// Loading

window.onload=function(){
	setTimeout(function() {
		deneme = document.getElementById('loading').style.display = 'none';
		 document.querySelector(' .player-box ').style.display = 'flex';
		 const galleryItems = document.querySelector('.player-box');
    	galleryItems.style.justifyContent = '';
    	galleryItems.style.alignItems = '';
	   },900);
     setTimeout(function() {
      showItems();
  }, 1000);
  
  	
  	
	  
  }

  $(document).ready(function() {
    $(".drop .option").click(function() {
      var val = $(this).attr("data-value"),
          $drop = $(".drop"),
          prevActive = $(".drop .option.active").attr("data-value"),
          options = $(".drop .option").length;
      $drop.find(".option.active").addClass("mini-hack");
      $drop.toggleClass("visible");
      $drop.removeClass("withBG");
      $(this).css("top");
      $drop.toggleClass("opacity");
      $(".mini-hack").removeClass("mini-hack");
      if ($drop.hasClass("visible")) {
        setTimeout(function() {
          $drop.addClass("withBG");
        },); 
      }
      triggerAnimation();
      if (val !== "placeholder" || prevActive === "placeholder") {
        $(".drop .option").removeClass("active");
        $(this).addClass("active");
      };
    });
    
    // function triggerAnimation() {
    //   var finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
    //   $(".drop").css("width", "24em");
    //   setTimeout(function() {
    //     $(".drop").css("width", finalWidth + "em");
    //   }, 400);
    // }
  });
