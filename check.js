if (document.querySelector(".post-type-post")) {
  document.querySelector("#major-publishing-actions").innerHTML = '<input type="button" name="Sprawdź" id="check" class="button button-large" value="Sprawdź">' + document.querySelector("#major-publishing-actions").innerHTML + '<div id="article_errors"></div>';

  var checked = false;

  function checkArticle() {
    document.querySelector("#article_errors").innerHTML = '<p style="margin-top:10px;margin-bottom:-8px"><b>Błędy:</b></p><ul>';
	var liczba_bledow = 0;
	 
    // Zabezpieczenia WP uniemożliwiają dostęp pod iframe, który jest w podglądzie wizualnym. Tekstowy aktualizuje się tylko, gdy jest otwarty, stąd konieczne jest przeklikanie, by sprawdzić zawartość artykułu
    if (document.querySelector('.tmce-active')) {
	  const currentScrollY = window.scrollY;
	  document.querySelector("#content-html").click();
      document.querySelector("#content-tmce").click();
	  function scrollSmoothly(targetY, delay) {
  		setTimeout(function() {
    		window.scrollTo(0, targetY);
  		}, delay);
	  }
	  scrollSmoothly(currentScrollY, 100);
	  scrollSmoothly(currentScrollY, 103);
	  scrollSmoothly(currentScrollY, 105);
	  scrollSmoothly(currentScrollY, 107);
	  scrollSmoothly(currentScrollY, 110);
	  scrollSmoothly(currentScrollY, 112);
	  scrollSmoothly(currentScrollY, 115);
	  scrollSmoothly(currentScrollY, 117);
	  scrollSmoothly(currentScrollY, 125);
	}

    var htmlString = document.querySelector('.wp-editor-area').value;
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlString, 'text/html');

    // Tytuł
    if (document.querySelector('#title').value === '') {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Artykuł nie ma tytułu</li>';
	  liczba_bledow += 1;
    } else if (document.querySelector('#title').value.slice(-1) === '.'&&document.querySelector('#title').value.endsWith('r.')==false) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Tytuł artykułu kończy się kropką</li>';
	  liczba_bledow += 1;
    }

    // Kategorie
    var kategorie_checked = 0;
    document.querySelectorAll("#categorychecklist input").forEach((e) => {
      if (window.getComputedStyle(e, '::before').getPropertyValue('content') !== 'none') kategorie_checked += 1
    });
    if (kategorie_checked == 0) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Nie wybrałeś kategorii</li>';
	  liczba_bledow += 1;
    }
    if (kategorie_checked > 1) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Wybrałeś więcej niż jedną kategorię</li>';
	  liczba_bledow += 1;
    }
    if (window.getComputedStyle(document.querySelector("#categorychecklist #category-1 input"), '::before').getPropertyValue('content') !== 'none') {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Zaznaczona jest kategoria „Inne”</li>';
	  liczba_bledow += 1;
    }

    // Tagi
    var tagi_checked = 0;
    document.querySelectorAll(".tagchecklist li").forEach((e) => {
      tagi_checked += 1
    });
    if (tagi_checked < 3) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Wybrałeś mniej niż 3 tagi</li>';
	  liczba_bledow += 1;
    }

    // Obrazek wyróżniający
    if (document.querySelector('#set-post-thumbnail').innerText === 'Ustaw obrazek wyróżniający') {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Nie ma obrazka wyróżniającego</li>';
	  liczba_bledow += 1;
    }

    // Obrazek w tle
    if (!document.querySelector('#warta_page_title_bg_meta_box img')) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Nie ma obrazka tła</li>';
	  liczba_bledow += 1;
    }

    // Źródła zdjęć
    var wystapieniaImg = htmlString.match(/<img/g);
    var wystapieniaMediaCredit = htmlString.match(/ \/>\[\/media-credit\]/g);
    var liczbaImg = wystapieniaImg ? wystapieniaImg.length : 0;
    var liczbaMediaCredit = wystapieniaMediaCredit ? wystapieniaMediaCredit.length : 0;
    if (liczbaImg != liczbaMediaCredit) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Zdjęcie nie ma źródła</li>';
	  liczba_bledow += 1;
    }

    // Cudzysłowy złe
    const regex2 = /<[^\]>]*>|\[[^\]]*\]/g;
    const result_cudz = htmlString.replace(regex2, '');

    if (result_cudz.includes('"') || result_cudz.includes(',,') || result_cudz.includes("''")) {
      document.querySelector("#article_errors").innerHTML += `<li class="error">W j. polskim cudzysłowy zapisuje się znakami „ ”, a nie <i>" "</i> lub <i>,, ''</i></li>`;
	  liczba_bledow += 1;
    }
	  
	    if (document.querySelector('#title').value.includes('"') || document.querySelector('#title').value.includes(',,') || document.querySelector('#title').value.includes("''")) {
      document.querySelector("#article_errors").innerHTML += `<li class="error">W j. polskim cudzysłowy zapisuje się znakami „ ”, a nie <i>" "</i> lub <i>,, ''</i> (błąd w tytule)</li>`;
	  liczba_bledow += 1;
    }
	  
	  if (document.querySelector('input[name="link_title[]"]').value.includes('"') || document.querySelector('input[name="link_title[]"]').value.includes(',,') ||document.querySelector('input[name="link_title[]"]').value.includes("''")) {
      document.querySelector("#article_errors").innerHTML += `<li class="error">W j. polskim cudzysłowy zapisuje się znakami „ ”, a nie <i>" "</i> lub <i>,, ''</i> (błąd w źródle)</li>`;
	  liczba_bledow += 1;
    }

    // Zajawka gdy jest źródło w tle
    if (htmlString.startsWith('<p class="source">') && document.querySelector("#excerpt").value == "") {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Dodaj zajawkę, możesz skopiować początek artykułu</li>';
	  liczba_bledow += 1;
    }

    // Źródło zdjęcia w tle
    var backgroundImageCredit = false;
    if(document.querySelector('#warta_page_title_bg_holder img')){
		doc.querySelectorAll('img').forEach((e) => {
		  if (e.src == document.querySelector('#warta_page_title_bg_holder img').src)
			backgroundImageCredit = true;
		});
		if (doc.querySelector('.source')) {
		  backgroundImageCredit = true;
		}
		if (!backgroundImageCredit) {
		  document.querySelector("#article_errors").innerHTML += '<li class="error">Dodaj źródło zdjęcia w tle</li>';
		  liczba_bledow += 1;
		}
	}
	  
	//Czy źródło zdj nie jest do pliku
	const regex3 = /\[media-credit [^\]]*\]/g;
	const matches = htmlString.match(regex3);
	var zle_zrodla = 0;
    if(matches!==null)matches.forEach((e) => {
      if ((e.includes('.png')||e.includes('.jpg')||e.includes('.webp'))&&(e.includes('wikimedia')==false||(e.includes('wikimedia')&&e.includes('upload')))) zle_zrodla += 1
    });
    if (zle_zrodla > 0) {
      document.querySelector("#article_errors").innerHTML += '<li class="error">Źródło zdjęcia prowadzi do pliku, a nie do artykułu, z którego pochodzi</li>';
	  liczba_bledow += 1;
    }

    // Źródła
    if (document.querySelector('input[name="link_title[]"]').value == '') {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Nie dodałeś źródła artykułu</li>';
	  liczba_bledow += 1;
    }

    // Choć 1 zdjęcie
    if (htmlString.indexOf("img") === -1) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Artykuł nie ma ani 1 zdjęcia</li>';
	  liczba_bledow += 1;
    }

    // alt w zdjęciach
    var no_alt_img = 0;
    doc.querySelectorAll('img').forEach((e) => {
      if (e.alt == "") {
        no_alt_img += 1;
      }
    });
    if (no_alt_img == 1) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Zdjęcie nie ma tekstu alternatywnego</li>';
	  liczba_bledow += 1;
    }
    if (no_alt_img > 1) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Zdjęcia nie mają tekstu alternatywnego</li>';
	  liczba_bledow += 1;
    }

    // Brak justowania
    var tempDiv = document.createElement('div');
    const regex = /\[caption[^\]]*\][\s\S]*?\[\/caption\]/g;
	const regex_yt = /(https:\/\/youtu[^\s]+(\n|$))|(https:\/\/www\.youtu[^\s]+(\n|$))/g;
	const result_just = htmlString.replace(regex, '');
	const result_without_youtube_links = result_just.replace(regex_yt, '');
    tempDiv.innerHTML = result_without_youtube_links;
    var pureTexts = Array.from(tempDiv.childNodes).filter(node => (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') && node.textContent.length >= 50);
    if (pureTexts.length > 0) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Masz niewyjustowany tekst („'+pureTexts[0].textContent.slice(0, 20)+'...”)</li>';
	  liczba_bledow += 1;
    }
	  
	// Koniec headera z kropką lub przecinkiem
	var kropka_na_koncu_headera = 0;
	var przecinek_na_koncu_headera = 0;
    doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((e) => {
      if (e.innerText.endsWith('.')&&e.innerText.endsWith('r.')==false) {
        kropka_na_koncu_headera += 1;
      }
	  if (e.innerText.endsWith(',')) {
        przecinek_na_koncu_headera += 1;
      }
    });
	if (kropka_na_koncu_headera > 0) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Nagłówek kończy się kropką</li>';
	  liczba_bledow += 1;
    }
	if (przecinek_na_koncu_headera > 0) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Nagłówek kończy się przecinkiem</li>';
	  liczba_bledow += 1;
    }
	  

	// Domeny a CC
	if (htmlString.includes('www.shutterstock.com') || htmlString.includes('www.gettyimages.com') || htmlString.includes('Shutterstock') || htmlString.includes('Getty Images')) {
      document.querySelector("#article_errors").innerHTML += '<li class="warning">Jesteś pewien, że użyte zdjęcia są na licencji <a href="https://creativecommons.org/share-your-work/cclicenses/" target="_blank" rel="nofollow noopener">Creative Commons</a> lub w <a href="https://pl.wikipedia.org/wiki/Domena_publiczna" target="_blank" rel="nofollow noopener">domenie publicznej</a>?</li>';
	  liczba_bledow += 1;
    }
	  
	  
    document.querySelector("#article_errors").innerHTML += '</ul>';
 	if(liczba_bledow == 0){
		document.querySelector("#article_errors").innerHTML += '<p class="no_errors">Gratulacje, brak podstawowych błędów</p>';
	}
	  
	 document.querySelector("#article_errors").innerHTML += '<button id="Refresh_er">Odśwież <span class=reload>↻</span></button>';
	 const refresh_button = document.getElementById("Refresh_er");
     if(refresh_button)refresh_button.addEventListener("click", checkArticle);
  }

  const checkButton = document.getElementById("check");
  if (checkButton) {
    checkButton.addEventListener("click", function () {
      if (checked) {
        checked = false;
        checkButton.value = "Sprawdź";
        document.querySelector("#article_errors").innerHTML = '';

      } else {
        checked = true;
        checkButton.value = "Zwiń";
        checkArticle();
      }
    });
  }
}
