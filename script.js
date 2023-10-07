const inpsearch = document.getElementById('input-search')
const btnsearch = document.getElementById('btn-search')
const showdsply = document.getElementById('display-data')

btnsearch.addEventListener('click', async function () {
    const query = inpsearch.value;
    showdsply.innerHTML = '';
    try {
        const reqdata = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${query}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '68f5c0a94cmshda761d44cfdfa12p1eff38jsnd4b9612e55fb',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            },
        })
        const data = await reqdata.json();

        const { cases, deaths, tests } = data.response[0];
        console.log({ cases, deaths, tests });

        const casesActive = showdata(cases.active, "Cases Active");
        const casesNew = showdata(cases.new, "New Cases");
        const casesRecovered = showdata(cases.recovered, "Recovered Cases");
        const casesTotal = showdata(cases.total, "Cases Total");

        const totalDeaths = showdata(deaths.total, "Total Deaths");

        const totalTests = showdata(tests.total, "Total Tests");
        
        showdsply.append(casesActive, casesNew, casesRecovered, casesTotal, totalDeaths, totalTests);
    } catch (error) {
        console.log(error);
        const dataError = document.createElement('p');
        dataError.innerText = 'Data Tidak Ditemukan';
        dataError.classList.add('text-lg', 'text-center', 'text-black', 'col-span-full');
        showdsply.appendChild(dataError);
    }
})

function showdata(data, title) {
    const container = document.createElement('div');
    const titleInput = document.createElement('p');
    const dataInput = document.createElement('p');

    container.classList.add('p-4', 'shadow-lg', 'rounded', 'bg-white');
    titleInput.classList.add('text-lg', 'font-bold', 'text-center', 'text-black')
    dataInput.classList.add('text-lg', 'text-center', 'text-black')

    titleInput.innerText = title;
    dataInput.innerText = data ? data : '-';
    container.append(titleInput, dataInput);

    return container;
}
