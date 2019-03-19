import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../css/App.css';
import { establishments } from './establishments/fixtures';

class App extends Component {

  constructor(props) {
          // Ne pas oublier d'appeler le constructeur père ! (Obligatoire)
          super(props);
          // On définit le state de notre component que l'on hérite de la classe "Component"
          // Cela remplace la fonction "getInitialState"
          this.state = {
              pseudo  : "Inconnu"
          }
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
      }

  render() {
      const listEstablishment = establishments.map( (establishment) => {
          return (
              // L'attribut "key" permet à React d'identifier les éléments.
              // Cela améliore les performances lors de l'ajout,
              // la modification et la suppression d'un élément.
              <li
                  key = { establishment.id }
                  className = 'establishment'
              >
                  <h3>{ establishment.name }</h3>

                  { establishment.description }

              </li>
          )
      })

      return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome "{ this.state.pseudo }" to { this.props.title }</h2>
            </div>
            <div className="App-intro">
                {/* On appelle notre fonction lors du clic sur le lien */}
                <p> <a onClick={ this.randomPseudo } >Changer le pseudo !</a> </p>
                <section>
                    { listEstablishment }
                </section>
            </div>
        </div>
      );
  }
}

export default App;
