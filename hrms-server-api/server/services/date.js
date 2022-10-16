const getCurrentDate = (date) => {
    // let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate();
    date = `${year}-${month}-${day}`
    return (new Date(date));
}

export default getCurrentDate;