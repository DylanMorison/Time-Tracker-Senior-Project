import React, { Component } from 'react';

// BrowserRouter is the "brains" of react-router
// BrowserRouter is the thing that tells react-router how to behave 
// It also looks at the current URL, and then changes the set of components
// that are visible on the screen at any given time.

// The Route object is a react component 
// used to set up a rule between a certain route the user might visit
// and a set of components that will be visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';


const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

// BrowserRouter expects to only get one child/div
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" component={Landing} />
                    <Route path="/surveys" component={Dashboard} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;