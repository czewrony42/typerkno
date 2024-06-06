const selecty = document.querySelectorAll('.wybieraczka');

selecty.forEach(function (select) {
  select.addEventListener('change', function () {
    const rodzic = select.parentElement.parentElement;
    rodzic.style.backgroundColor = '#7dfa94';
    rodzic.style.border = '2px solid #7dfa94';
  });
});

document.getElementById('formularz').addEventListener('submit', function (event) {
  event.preventDefault();

  const selects = this.querySelectorAll('select');
  let wszystkieWybrane = true;

  selects.forEach(function (select) {
    if (select.value == "nie-wybrano") {
      wszystkieWybrane = false;
      return;
    }
  });

  if (wszystkieWybrane) {
    this.submit();
  } else {
    alert("Proszę wybrać wszystkie opcje z pól wyboru.");
  }
});