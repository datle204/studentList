export default function Pagination({ changePage, totalItems, currentPage }) {
  let pagiItems = [];
  let numberPage = Math.round(totalItems / 3);
  for (let i = 1; i <= numberPage; i++) {
    pagiItems.push(i);
  }

  let newPagiItems = pagiItems.map((pagiItem) => (
    <button
      className={
        currentPage === pagiItem ? "pagi-btn pagi-btn-active" : "pagi-btn"
      }
      onClick={() => changePage(pagiItem)}
      key={pagiItem}
      id={pagiItem}
    >
      {pagiItem}
    </button>

  ));

  return <li className="pagiList">
    
    {newPagiItems}
    </li>;
}
