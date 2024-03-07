// const url_team = "https://www.transfermarkt.com.tr/super-lig/daten/wettbewerb/TR1";

// fetch(url_team)
//     .then(response => response.text())
//     .then(data => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(data, "text/html");
//         const fenerbahce = [];

//         const table = doc.querySelector("table.items");

//         if (!table) {
//             console.log("Tablo bulunamadı.");
//         } else {
//             table.querySelectorAll("tr.odd, tr.even").forEach(row => {
//                 const player = {};

//                 player.name = row.querySelector(".inline-table .hauptlink a").textContent.trim() || null;
//                 player.country = row.querySelector("img.flaggenrahmen").getAttribute("title") || null;
//                 player.num = row.querySelector("td.zentriert").textContent.trim() || null;
//                 player.age = row.querySelectorAll("td.zentriert")[1].textContent.trim() || null;
//                 player.foot = row.querySelectorAll("td.zentriert")[4].textContent.trim() || null;
//                 player.height = row.querySelectorAll("td.zentriert")[3].textContent.trim() || null;
//                 player.teamLogo = row.querySelectorAll(".no-border-rechts a img")[0]?.getAttribute("src") || null;
//                 player.position = row.querySelectorAll("td.posrela tr")[1].textContent.trim() || null;
//                 console.log(player.flag);
                


//                 fenerbahce.push(player);
//             });
//         }

//         const playerBoxContainer = document.getElementById("player-container");

//         fenerbahce.forEach(player => {
//             const playerBox = document.createElement("div");
//             playerBox.classList.add("card-header-bg");
          
//             playerBox.innerHTML = `
              
                    
//                     <img src="${player.teamLogo}" alt="${player.teamLogo}">
                    
                  
                
//             `;
//             playerBoxContainer.appendChild(playerBox);
//         });
//     })
    
//     .catch(error => {
//         console.log(`Error: ${error.message}`);
//     });





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
            const teamListDiv = document.createElement('div');
            teamListDiv.id = 'teamList';
            teamListDiv.classList.add('teamList');

            const dropDiv = document.createElement('div');
            dropDiv.classList.add('drop');

            teamList.forEach(teamName => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('option');
                optionDiv.setAttribute('data-value', teamName.toLowerCase().replace(/\s/g, ''));

                const li = document.createElement('li');
                li.textContent = teamName;

                optionDiv.appendChild(li);
                dropDiv.appendChild(optionDiv);
            });

            teamListDiv.appendChild(dropDiv);
            document.body.appendChild(teamListDiv);
        }
    }
};
xhr.send();
