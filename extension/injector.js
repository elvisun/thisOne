function filterResultInserts(event) {
  console.log(event);
}

target.addEventListener('DOMNodeInserted', filterResultInserts);