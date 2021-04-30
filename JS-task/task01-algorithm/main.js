const movieList = [
    { title: 'Vissza a jövőbe', year: 1990, timeInMinute: 95 },
    { title: 'Titanic', year: 1997, timeInMinute: 182 },
    { title: 'Charlie angyalai', year: 2003, timeInMinute: 99 },
    { title: 'Robotzsaru', year: 1997, timeInMinute: 101 },
    { title: 'Hangtalanul', year: 2015, timeInMinute: 120 },
    { title: 'Csillagok között', year: 2020, timeInMinute: 180 },
    { title: 'Top Gun', year: 1990, timeInMinute: 100 }
]

function movieFilter(list, year, maxTimeInMinutes) {
    return (
        list.filter(item => item.year === year && item.timeInMinute <= maxTimeInMinutes)
            .map(item => item.title)
    );
}

export { movieFilter };