# Curl Safe - Front End
An app that uses Google's VisionAI API to scan hair product ingredient labels. In the curly/wavy hair world there is a movement called the Curly Girl Method (CG Method). The Method is used to make healthy hair specifically for curly/ wavy hair individuals. CG Method consists of not using hair products that contain certain ingredients- Sulfates, Silicones, Short Chain Alcohols, Parabens, Formaldehydes, Soaps, Waxes, Mineral oils. The issue is, there are over 100 of these ingredients! How can an individual check a tiny ingredients label and make sure to check for each one? 
This is exactly what my Curl Safe solves. 
Check out the [Backend](https://github.com/JpadillaCoding/CurlSafe-Backend)!

## Installation 
Available on the Google Play store!
App store coming soon!

## Technologies 

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">

React Native was picked for its ease of implementation for both IOS and Andriod. Used the power of the react components to make scalable buttons, ingredient lists, and navigable screens. The backbone of this project is manipulating state to dynamically render the results of the analyzer. 

<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">

Redux worked great for managing state used on different screens. Moving state between the Flatlist component was a bit of a hassle, and redux takes care of that by making state usable on any component!

<img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white">

The Expo package made testing code extremely easy. It also has many packages that come in very handy for native development. Dependencies used in this project are Google fonts, camera, and image picker- all essential tools for picking an image to analyze and making a beautiful app!

## Upcoming Features

- Searchable: Being able to check if an ingredient is on the CG Method do not use list. 
- Allergies: User will add ingredients they are allergic to which the analyzer will look for. 

## Screen shots

<img src="CurlSafe/assets/Homepage.jpg" alt="Curl safe Homepage">
<img src="CurlSafe/assets/Analyzer.jpg" alt="Curl safe analyzer page">
<img src="CurlSafe/assets/Ingredients.jpg" alt="Curl safe Ingredients page">

## Acknowledgments 

- This app was inspired by the CG Method- A guideline for taking care of  Natural hair. Originally made by Lorraine Masse- Check out her [book](https://a.co/d/0DKIAwM)!

- The curly hair [subreddit](https://www.reddit.com/r/curlyhair/) which first introduced me to proper care of curly hair.

- [Curls bot](https://www.curlsbot.com/) A website that lets you type in ingredients to check if they're on the CG method do not use list. 

- [Curl Scan](https://curlscan.com/) A website that tells the user if a hair product is CG Method approved. Community-driven to keep expanding their database of products. 



