// Pobierz wszystkie elementy select o klasie "wybieraczka"
const selecty = document.querySelectorAll('.wybieraczka');

// Iteruj przez każdy element select
selecty.forEach(function(select) {
    // Dodaj nasłuchiwanie zdarzenia zmiany dla każdego selecta
    select.addEventListener('change', function() {
        // Pobierz element nadrzędny (parentElement) dla selecta
        const rodzic = select.parentElement.parentElement;

        // Tutaj możesz dokonać zmiany stylu dla elementu nadrzędnego
        rodzic.style.backgroundColor = '#7dfa94'; // Przykładowa zmiana koloru tła
        rodzic.style.border = '2px solid #7dfa94'; // Przykładowa zmiana stylu obramowania
        // Możesz dodać więcej zmian stylu, w zależności od potrzeb

        // Możesz również dodać inne działania, które mają być wykonane po zmianie selecta
    });
});

document.getElementById('formularz').addEventListener('submit', function(event) {
    event.preventDefault(); // Zatrzymaj domyślne zachowanie formularza

    // Pobierz wszystkie pola wyboru w formularzu
    const selects = this.querySelectorAll('select');

    let wszystkieWybrane = true;

    // Sprawdź, czy każde pole wyboru ma opcję inną niż domyślna
    selects.forEach(function(select) {
      if (select.value == "nie-wybrano") {
        wszystkieWybrane = false;
        return; // Przerwij pętlę, jeśli jedno pole wyboru ma opcję domyślną
      }
    });

    if (wszystkieWybrane) {
      // Wszystkie opcje zostały wybrane - wyślij formularz
      this.submit();
    } else {
      // Wyświetl komunikat o błędzie
      alert("Proszę wybrać wszystkie opcje z pól wyboru.");
    }
  });