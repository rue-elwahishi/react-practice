import React, {Component} from 'react';
import image from '../img/vumbulaitem.png';
import {ItemCard} from "./ItemCard";
import {Footer} from "./Footer";
import {Nav} from "./Nav";
import {Jumbtron} from "./Jumbtron";
import {AddItem} from "./AddItem";

class App extends Component {
  //TODO 1: Add name and price to the state object
 
  state = {
    items: [
      {
        id: 1,
        name: "Noodles",
        price: "15"
      },
      {
        id: 2,
        name: "Mangoes",
        price: "10"
      },
      {
        id: 3,
        name: "Oranges",
        price: "20"
      },
      {
        id: 4,
        name: "Passion Fruits",
        price: "14"
      }
    ]
  };
  
  handleInputChange = (event) => {
    // console.log('im working')
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
     [name]:value
    })
   }

   addItem = (event) => {
    //  console.log('HIIII IM WORKING')
     event.preventDefault()
     const {name, price} = this.state
     const id =  this.state.items.length ? this.state.items[this.state.items.length-1].id + 1 : 1
     this.setState({
       items:[
         ...this.state.items,
         Object.assign({},{
           id,
           name,
           price
         })
        ],
         name:"",
         price:""
        })
   }
 
   handleItemUpdate = (event, index) => {
      const target = event.target;
      const value = target.value;
      const name = target.name
      this.setState({
        items: this.state.items.map((item, itemIndex) => {
          if(itemIndex === index){
            return {
              ...item,
              [name]:value
            }
          }
          return item
        })
      })
   }


   toggleItemEditing = (index) => {
     this.setState({
       items:this.state.items.map((item, i) => {
         if(i === index){
           return {
             ...item,
             isEditing: !item.isEditing
           }
         }
         return item
       })
     })
   }
  
  //TODO 9: Create an arrow function called handleInputChange which accepts event as its own argument.
  //TODO 10: Handle the event changes in the name and price input elements when a user types in them.
  //TODO 14: Define an arrow function called addItem which accepts event as its only argument.
  //TODO 15: Within it call preventDefault() on event and also add the functionality to add
  //TODO the name and price to the items array within the component state.

  render() {
    const {name, price} = this.state;
    //TODO 2: Destruct name and price from the state object and pass them as props to the AddItem component.
    //TODO 11: Define an onChange prop on the AddItem component with a value of this.handleInputChange
    //TODO 16: Define an onSubmit prop on the AddItem with a value of this.addItem
    return <div>
      <Nav/>

      <Jumbtron/>

      <div className="container pt-4">

        <AddItem name={name} price={price} onChange={this.handleInputChange} onSubmit={this.addItem}/>

        <h1 className="display-4 my-4 text-center text-muted">Items</h1>

        <div className="row">
          {
            this.state.items.map((item, index) =>
                <ItemCard
                    onChange={(event) => this.handleItemUpdate(event, index)}
                    toggleEditing={() => this.toggleItemEditing(index)}
                    key={item.id}
                    index={index}
                    image={image}
                    item={item}
                />
            )
          }
        </div>

        <hr/>
        <Footer/>
      </div>
    </div>;
  }
}

export default App;
