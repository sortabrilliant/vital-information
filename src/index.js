const QUOTES = [
	'If your phone rings, pick it up. If your butt rings, see a doctor.',
	'When you cough something up, never take it to school and tell people it’s your friend Robert.',
	'Don’t pour soup on yourself and run around shouting, "Hey, everybody, look at me! I’m Soup Girl!".',
	'To get your teacher’s attention, it’s a bad idea to scream, "Hey, look over here, you freakish animal!".',
	'If you’re drinking apple juice, and it feels warm, odds are that ain’t apple juice.',
	'The early bird gets the worm. FINE! I don’t want the worm.',
	'Breaking up is hard to do. Breaking a dozen eggs with a sledgehammer is fun.',
	'You are what you eat. I am thirteen tacos and a stick of butter.',
	'It’s fun to play in the snow. It’s less fun to play in a bathtub full of vomit.',
	'It’s no fun to go to the dentist, especially if your dentist pushed you down a flight of stairs.',
];

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @see https://gist.github.com/jwilson8767/db379026efcbd932f64382db4b02853e
 *
 * @param {string} selector
 * @return {Promise} Returns promise
 */
function elementReady( selector ) {
	return new Promise( ( resolve ) => {
		const el = document.querySelector( selector );
		if ( el ) {
			resolve( el );
		}
		new MutationObserver( ( mutationRecords, observer ) => {
			// Query for elements matching the specified selector
			Array.from( document.querySelectorAll( selector ) ).forEach(
				( element ) => {
					resolve( element );
					// Once we have resolved we don't need the observer anymore.
					observer.disconnect();
				}
			);
		} ).observe( document.documentElement, {
			childList: true,
			subtree: true,
		} );
	} );
}

/**
 * Gets a random element from `array`.
 *
 * Borrowed from the lodash library.
 *
 * @param {Array} array The array to sample.
 * @return {*} Returns the random element.
 */
function sample( array ) {
	const length = array === null ? 0 : array.length;
	return length ? array[ Math.floor( Math.random() * length ) ] : undefined;
}

/**
 * Display random quote.
 *
 * @param {Element} toolbar
 */
function displayTheQuote( toolbar ) {
	const quote = sample( QUOTES );
	const vitalExists = document.querySelector( '.vital-information' );

	if ( vitalExists ) {
		vitalExists.innerText = quote;
		return;
	}

	const vital = document.createElement( 'span' );
	toolbar.appendChild( vital );

	vital.innerText = quote;
	vital.className = 'vital-information';
	vital.style.display = 'flex';
	vital.style.alignItems = 'center';
	
	vital.style.marginLeft = '20px';

	return quote;
}

elementReady( '.edit-post-header__toolbar' ).then( ( toolbar ) =>
	displayTheQuote( toolbar )
);
