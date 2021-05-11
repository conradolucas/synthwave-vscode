(function () {


  // Grab body node
  const bodyNode = document.querySelector('body');

  // Replace the styles with the glow theme
  const initNeonDreams = (disableGlow, obs) => {
    var themeStyleTag = document.querySelector('.vscode-tokens-styles');

    if (!themeStyleTag) {
      return;
    }

    var initialThemeStyles = themeStyleTag.innerText;
    
    var updatedThemeStyles = initialThemeStyles;
    // fff5f6
    if (!disableGlow) {
      /* replace neon red */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fe4450;/g, "color: #ff2f2f; text-shadow: 0 0 7px #2b0808, 0 0 1px #b30404, 0 0 3px #f90336, 0 0 2px #bf0808");
      
      /* replace neon pink */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #ff7edb;/g, "color: #e7d8f7; text-shadow:0 0 6px #6900c5, 0 0 1px #8656c1, 0 0 3px #4b1494, 0 0 2px #3d1048");
      // updatedThemeStyles = updatedThemeStyles.replace(/color: #ff7edb;/g, "color: #b075ff;");
      
      /* replace purple - old yellow */
      // updatedThemeStyles = updatedThemeStyles.replace(/color: #fede5d;/g, "color: #ffcc13; text-shadow:0 0 7px #001716, 0 0 1px #d7f755, 0 0 3px #01ec35, 0 0 2px #00fb37");
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fede5d;/g, "color: #ffbfe6; text-shadow:0 0 7px #ff04b2, 0 0 1px #f768bc, 0 0 3px #d83697, 0 0 2px #ff73c7");
      
      /* replace green */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #72f1b8;/g, "color: #65f5a5; text-shadow:0 0 5px #2c861c, 0 0 1px #084214, 0 0 3px #484605, 0 0 2px #64ff02; font-family: 'Operator Mono'; font-size: 15px");
      
      /* replace blue */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #36f9f6;/g, "color: #34ebdd; text-shadow: 0 0 7px #001716, 0 0 1px #0321f9, 0 0 3px #03edf9, 0 0 2px #0d2fd4");
    }

    /* append the remaining styles */
    updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;

    const newStyleTag = document.createElement('style');
    newStyleTag.setAttribute("id", "synthwave-84-theme-styles");
    newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
    document.body.appendChild(newStyleTag);
    
    console.log('Synthwave \'84: NEON DREAMS initialised!');
    
    // disconnect the observer because we don't need it anymore
    if (obs) {
      obs.disconnect();
    }
  };

  // Callback function to execute when mutations are observed
  const watchForBootstrap = function(mutationsList, observer) {
      for(let mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            // only init if we're using a Synthwave 84 subtheme
            const isUsingSynthwave = document.querySelector('[class*="RobbOwen-synthwave-vscode-themes"]');
            // does the style div exist yet?
            const tokensLoaded = document.querySelector('.vscode-tokens-styles');
            // does it have content ?
            const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;

            // sometimes VS code takes a while to init the styles content, so stop this observer and add an observer for that
            if (isUsingSynthwave && tokensLoaded) {
              observer.disconnect();
              observer.observe(tokensLoaded, { childList: true });
            }
          }
          if (mutation.type === 'childList') {
            const isUsingSynthwave = document.querySelector('[class*="RobbOwen-synthwave-vscode-themes"]');
            const tokensLoaded = document.querySelector('.vscode-tokens-styles');
            const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;

            // Everything we need is ready, so initialise
            if (isUsingSynthwave && tokensLoaded && tokenStyles) {
                initNeonDreams([DISABLE_GLOW], observer);
            }
          }
      }
  };

  // try to initialise the theme
  initNeonDreams([DISABLE_GLOW]);

  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true });

})();