module.exports = function konwertujTimestampNaDate(timestamp) {
  // Tworzenie obiektu Date z timestampem Unix w milisekundach
  let data = new Date(timestamp);

  // Pobieranie składników daty
  let rok = data.getFullYear();
  let miesiac = String(data.getMonth() + 1).padStart(2, '0'); // Miesiące są zero-indeksowane
  let dzien = String(data.getDate()).padStart(2, '0');
  let godzina = String(data.getHours()).padStart(2, '0');
  let minuta = String(data.getMinutes()).padStart(2, '0');
  let sekunda = String(data.getSeconds()).padStart(2, '0');

  // Formatowanie daty
  let sformatowanaData = `${dzien}-${miesiac}-${rok} ${godzina}:${minuta}:${sekunda}`;
  
  return sformatowanaData;
}