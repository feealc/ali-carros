module.exports = {
	getCurrentDate,
}

function getCurrentDate() {
  
  const currentDate = new Date().toISOString().slice(0,10)

  return currentDate

}
