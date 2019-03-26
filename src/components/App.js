import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import { establishments } from './establishments/fixtures';
import Establishment from './establishments/Establishment';

class App extends Component {

  constructor(props) {
          // Ne pas oublier d'appeler le constructeur père ! (Obligatoire)
          super(props);
          // On définit le state de notre component que l'on hérite de la classe "Component"
          // Cela remplace la fonction "getInitialState"
          this.state = {
              pseudo  : "Inconnu",
              //Ici ce trouve la valeur de l'input
              searchStringUser: ""
          }
          this.handleChange = this.handleChange.bind(this);
          //bind Vu que la fonction est appellée depuis l'HTML, le scope est différent.  si on retire le bind, la fonction sera bien appelée mais ne pourra pas manipuler quelque chose qui vient du this
  }//\end constructor props

  // Fonction qui recupère l'event de l'input et recupére sa valeur pour la mettre dans le state
  handleChange(e){
     this.setState({searchStringUser: e.target.value});
  }

  componentWillMount () {
      console.log("componentWillMount")
  }

  componentDidMount () {
      console.log("componentDidMount")
  }

  // On définit la fonction appelée lors d'un clic sur le lien "Changer le pseudo !"
  // la syntaxe  " nomFonction = () => {} " nous permet de conserver le contexte `this` du scope courant. (Ici, la classe App)
  randomPseudo = () => {
      // On s'amuse un peu ;)
      let randomPseudo    = ""
      const possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      const size          = Math.floor(Math.random() * 10) + 5
      for( let i=0; i < size; i++ ){
          randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      // On met à jour le state via la fonction "setState" héritée de la classe Component
      this.setState({
          pseudo : randomPseudo
      })
  }//\fct randomPseudo

  render() {
      console.log("render")

      const establishmentFilter = establishments.filter((searchText) => {
        let search = searchText.name + " " + searchText.description;
        return search.toLowerCase().match(this.state.searchStringUser);
      });

      const listEstablishment = establishmentFilter.map( (establishment) => {
        return (
          <Establishment
              key={ establishment.id }
              establishment={ establishment }
              /* on n'a pas oublié la props "establishment" :) */
          />
        )
      })

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome "{ this.state.pseudo }" to { this.props.title }</h2>
          </header>
          <div className="App-intro">
              {/* On appelle notre fonction lors du clic sur le lien */}
              <p> <a onClick={ this.randomPseudo } >Changer le pseudo !</a> </p>
              <div>
              {/* l'input contient deux attribut spéciaux :*/}
              {/* value (vous avez compris ce que ça vaut maintenant)*/}
              {/* onChange ( fonction qui va être lancée à chaque changement de l'input. Cette fonction en appel un autre qui recupère donc la value et la modifie dans le state)*/}
                  <input
                      type="text"
                      placeholder="search"
                      value={this.state.searchStringUser}
                      onChange={this.handleChange}
                  />
              </div>
              <section>
                  { listEstablishment }
              </section>
          </div>
        </div>
      );
  }//\render
}//\class App

export default App;
