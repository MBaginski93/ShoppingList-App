import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
	Route,
	Link,
	IndexLink,
	IndexRoute,
	hashHistory
} from 'react-router';

document.addEventListener('DOMContentLoaded', function() {

	class FrontPage extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				inputListId: "",
				inputListCreate: "",
				openBtn: "btn-list-open",
				createBtn: "btn-list-create-disabled",
			}
		}
		handleInputListCreate = (e) => {
			let inputVal = e.target.value;
			this.setState({inputListCreate: inputVal})
			if (inputVal.length > 3) {
				this.setState({createBtn: "btn-list-create"})
			}else {
				this.setState({createBtn: "btn-list-create-disabled"})
			}
		}
		render() {
			return (
				<div className = "main-frontpage">
					<div className = "main-frontpage-container">
						<div className = "front-page-ornament">
							<h1 className = "front-page-logo-text">ShoppingListApp</h1>
						</div>
						<div className = "log-in-container">
							<input onChange = {this.handleInputListCreate} type = "text" className = "input-list-create" value = {this.state.inputListCreate} placeholder = "Nowa lista"></input>
							<IndexLink className = {this.state.createBtn} to = {"/home/"+this.state.inputListCreate} >+</IndexLink>
						</div>
						<div className = "front-page-socials">
							<div className = "front-page-author">
								<div className = "front-page-author-orn">
									<h2>Maciej Bagiński</h2>
								</div>
							</div>
							<a href = "https://www.linkedin.com/in/maciejbaginski93">LinkedIn</a>
							<a href = "https://github.com/MBaginski93">GitHub</a>
						</div>
					</div>
				</div>

			);
		}
	}

	class ListPage extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				listItemState: "-",
				listItemClass: "",
				listName: "",
			}
		}
		handleClickItemState = (e) => {
			if (this.state.listItemState == "-") {
				this.setState({listItemState: "+", listItemClass: "active"})
			}else {
				this.setState({listItemState: "-", listItemClass: ""})
			}
		}
		render() {
			return (
				<div className = "list-page">
					<div className = "list-page-border">
						<h1 className = "list-page-name">{this.props.params.createdId}</h1>
						<div className = "list-page-items-container">
							<ul className = "list-page-items">
								<li className = {this.state.listItemClass}>Jaja <button className = {this.state.listItemClass} onClick = {this.handleClickItemState}>{this.state.listItemState}</button></li>
							</ul>
						</div>
					</div>
				</div>
			);
		}
	}

	class MainHeader extends React.Component {
		constructor(props) {
			super(props)
		}
		handleClick = (e) => {
			prompt("Skopiuj link do twojej listy i prześlij dalej", "http://localhost:3001/#/list/"+this.props.listUrl)
		}
		render() {
			return (
				<div className ="container">
					<header className ="main-header">
						<nav className = "main-nav">
							<h1 className = "main-nav-logo-text" >ShoppingListApp</h1>
							<ul className = "main-nav-list">
								<IndexLink to = "/" className = "main-nav-link">start</IndexLink>
								<IndexLink to = {"/list/"+this.props.listUrl} onClick = {this.handleClick} className = "main-nav-link">twoja lista</IndexLink>
							</ul>
						</nav>
					</header>
				</div>
			);
		}
	}

	class MainSection extends React.Component{
		constructor(props) {
			super(props)
		}
		render() {
			return (
				<div className ="container">
					<div className = "section-row-1">
						<section className = "section-products">
							<div className = "section-products-line">_ _ _ _ _ _ _ _ _ _ _ _ _ _</div>
							<h1 className = "section-products-logo">Produkty</h1>
							<div className = "section-products-cnt">

							</div>
						</section>
					</div>
				</div>
			);
		}
	}

	class HomePage extends React.Component {
		constructor(props) {
			super(props)
		}
		render() {
			return (
				<div className = "main-container">
					<MainHeader listUrl = {this.props.params.newId}/>
					<MainSection/>
				</div>
			);
		}
	}

	class App extends React.Component {
		render() {
			return (
				<Router history = {hashHistory}>
					<Route path = "/" component = {FrontPage}></Route>
					<Route path = "/home/:newId" component = {HomePage}>
						<Route path = "/" component = {FrontPage}></Route>
					</Route>
					<Route path = "/list/:createdId" component = {ListPage}></Route>
				</Router>
			);
		}
	}

    ReactDOM.render(
			<App/>,
        document.getElementById('app')
    );
});
