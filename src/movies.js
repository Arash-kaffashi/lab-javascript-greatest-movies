// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
	let unique = {};
	moviesArray.map(({ director }) => (unique[director] = 1));
	return Object.keys(unique);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
	return moviesArray.filter(({ director, genre }) => genre.includes("Drama") && director === "Steven Spielberg").length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
	if (!moviesArray.length) return 0;
	let average = moviesArray.reduce((acc, { score }) => acc + (score || 0), 0) / moviesArray.length;
	return +average.toFixed(2);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
	let dramaMovies = moviesArray.filter(({ genre }) => genre.includes("Drama"));
	return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
	return [...moviesArray].sort(({ title: title1, year: year1 }, { title: title2, year: year2 }) => {
		if (year1 !== year2) return year1 - year2;
		return title1.localeCompare(title2);
	});
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
	return moviesArray
		.sort(({ title: title1 }, { title: title2 }) => title1.localeCompare(title2))
		.slice(0, 20)
		.map(({ title }) => title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
	return moviesArray.map(movie => {
		let inMinutes = movie.duration.replace(/(\d+)h(?:\s(\d*)min)?/, function (match, hour = 0, minute = 0) {
			return parseInt(hour) * 60 + parseInt(minute);
		});
		return Object.assign({}, movie, { duration: parseInt(inMinutes) });
	});
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
	if (!moviesArray.length) return null;
	let moviesByYear = {};
	moviesArray.forEach(({ year, score }) => {
		if (!(year in moviesByYear)) moviesByYear[year] = { sum: score, len: 1 };
		else {
			moviesByYear[year].sum += score;
			moviesByYear[year].len++;
		}
	});
	let best = {
		year: 0,
		average: 0,
	};
	for (let year in moviesByYear) {
		let { sum, len } = moviesByYear[year];
		let average = sum / len;

		if (average > best.average || (average === best.average && year < best.year)) {
			best.year = year;
			best.average = average;
		}
	}
	return `The best year was ${best.year} with an average score of ${best.average}`;
}
