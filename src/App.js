import { Button } from './components';

const data = [
  've',
  'stuff',
]

// http://getbem.com/introduction/

const App = () => {
  console.log(data)

  return (
    <div className="App">
      {data.map((value) => (
        <div>{value}</div>
      ))}
      <input placeholder=''/>
      <Button
        text='My Button'
      />
    </div>
  );
}

export default App;
