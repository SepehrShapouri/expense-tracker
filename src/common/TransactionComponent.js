import { useEffect, useState } from "react";
import Transaction from "./Transaction";

const TransactionComponent = ({ transactions }) => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredTnx, setFilteredTnx] = useState(transactions);
  const changeHandler = (e) => {
    setSearchItem(e.target.value);
    filterTransactions(e.target.value);
  };
  const filterTransactions = (search) => {
    if (!search) {
      setFilteredTnx(transactions);
      return;
    }
    const filteredState = transactions.filter((t) => {
      return t.desc.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTnx(filteredState);
    console.log(filteredState);
  };
  useEffect(() => {
    filterTransactions(searchItem);
  }, [transactions]);

  if(!transactions.length) return <h3 className="addTnx">add some transactions</h3>
  return (
    <section className="transactionContainer">
      <input type="text" defaultValue={searchItem} onChange={changeHandler} placeholder="Search for tnx..."  className="search"/>
      {filteredTnx.length ?
      filteredTnx.map((item) => (
        <Transaction
          desc={item.desc}
          amount={item.amount}
          key={item.id}
          type={item.type}
        />
      ))
    :<p className="nomatch">No transactions matched!</p>}
    </section>
  );
};

export default TransactionComponent;
