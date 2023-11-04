if(document.querySelector("body[class~='logged-in']")){
	document.querySelector("html").classList.add("logged-in");
	window.addEventListener('load', function () {
	var userInfoImage = document.querySelector("#wp-admin-bar-user-info img");
	var displayName = document.querySelector(".display-name");
	var panel = document.createElement('div');
	if(document.querySelector("#wp-admin-bar-customize")){
	  panel.innerHTML = `
		<div id="panel_boczny">
		  <div id="panel_boczny_imie">
			<img class="powitanieimg_boczne" src="${userInfoImage.src.replace('-64x64', '')}" />
			<div><h2><p id="witaj">Witaj,</p>${displayName.innerHTML}</h2>
			<a href="https://astronet.pl/wp-admin/profile.php">Edytuj profil</a><br>
			<a href="https://astronet.pl/almulogin/?action=logout">Wyloguj się</a>
			</div>
		  </div>
		  <div class="przyciski_boczne">

			<a href="https://astronet.pl/redaktor/"><button class="panel">Panel<br>redaktora</button></a>
			<a href="https://astronet.pl/wp-admin/"><button class="kokpit">Kokpit</button></a>
			<a href="${document.querySelector("#wp-admin-bar-customize a").href}"><button class="dostosuj">Dostosuj</button></a>
			<a href="${document.querySelector("#wp-admin-bar-edit a").href}"><button class="panel">${document.querySelector("#wp-admin-bar-edit a").innerHTML}</button></a>
			<a href="https://astronet.pl/wp-admin/post-new.php"><button class="nowy-wpis">Nowy<br>artykuł</button></a>
			<a href="https://astronet.pl/wp-admin/post-new.php?post_type=ai1ec_event"><button class="nowe-wydarzenie">Nowy wpis<br>do kalendarza</button></a>
			<a href="https://discord.gg/CVrayr53HC"><button class="dc">Serwer<br>Discord</button></a>
			<a href="https://drive.google.com/drive/folders/0AFNZq6yeW0fwUk9PVA"><button class="dysk">Dysk<br>redakcji</button></a>
			<a href="https://astronet.pl/wp-content/uploads/2023/06/Regulamin_AstroNETu.pdf"><button class="regulamin">Regulamin<br>AstroNETu</button></a>

			</div>
		</div>`;
	} else{
			  panel.innerHTML = `
		<div id="panel_boczny">
		  <div id="panel_boczny_imie">
			<img class="powitanieimg_boczne" src="${userInfoImage.src.replace('-64x64', '')}" />
			<div><h2>Witaj,<br>${displayName.innerHTML}</h2>
			<a href="https://astronet.pl/wp-admin/profile.php">Edytuj profil</a><br>
			<a href="https://astronet.pl/almulogin/?action=logout">Wyloguj się</a>
			</div>
		  </div>
		  <div class="przyciski_boczne">

			<a href="https://astronet.pl/redaktor/"><button class="panel">Panel<br>redaktora</button></a>
			<a href="https://astronet.pl/wp-admin/"><button class="kokpit">Kokpit</button></a>
			<a href="https://astronet.pl/wp-admin/post-new.php"><button class="nowy-wpis">Nowy<br>artykuł</button></a>
			<a href="https://astronet.pl/wp-admin/post-new.php?post_type=ai1ec_event"><button class="nowe-wydarzenie">Nowy wpis<br>do kalendarza</button></a>
			<a href="https://discord.gg/CVrayr53HC"><button class="dc">Serwer<br>Discord</button></a>
			<a href="https://drive.google.com/drive/folders/0AFNZq6yeW0fwUk9PVA"><button class="dysk">Dysk<br>redakcji</button></a>
			<a href="https://astronet.pl/wp-content/uploads/2023/06/Regulamin_AstroNETu.pdf"><button class="regulamin">Regulamin<br>AstroNETu</button></a>

			</div>
		</div>`;
	}
	  document.body.appendChild(panel);
	});
}
