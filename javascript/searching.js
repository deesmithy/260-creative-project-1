function onClick(e) {
  e.preventDefault();
  // Get the form valueslet
  s = document.getElementById('college-search-selector');
  let type = s.options[s.selectedIndex].value;
  let query = document.getElementById('college-search-field').value;
  //Maybe put in some stuff for the selector.
  let url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school." + type + "=" + query;


  let apikey = "z9jtXEIB8nVf8yCXFh3LeVMbhriNEGrd1bTJua83";
  url += "&api_key=" + apikey;
  console.log(url)
  fetch(url)
  .then(function(response) {
    if (response.status != 200) {
      return {
        text: "Error calling the Numbers API service: " + response.statusText
      }
    }

    return response.json();
  }).then(function(json) {
    document.getElementById('search-result-container').innerHTML = "";
    if (json.results.length === 20) {
      document.getElementById('search-result-container').innerHTML += "<p> Your search has more than 20 results, so we are only showing the first 20. Feel free to enter a more specific query. </p>";
    } // Reset the content for each time the search happens
    for (let result of json.results) {
      updateResult(result);
    }

    console.log(json.results);
  })
  //Put an alert so that I can see when the function is called. put the url as it stands in the alert text
}

//Find a way to get the info from the api using the correct URL.
//Show an alert if the data is incorrect.

document.getElementById('college-search-button').addEventListener('click', onClick);



function updateResult(result) {


  let newHTML = "";
  newHTML += '<a href="https://' + result.school.school_url + '" target="_blank">'

  newHTML += '<div class="result-container">';
  newHTML += '<h6><strong><em>'+ result.school.name +'</em></strong> - '+ result.latest.school.city + ', ' + result.latest.school.state +'</h6>';
  newHTML += '<div class="info-box">';
  newHTML += '<h6>Admission</h6>';
  newHTML += '<div class="row">';
  newHTML += '<div class="col-sm">';
  newHTML += '<ul>';
  newHTML += '<li>Acceptance Rate: ' + (result.latest.admissions.admission_rate.overall*100).toFixed(2) + '%</li>';
  newHTML += '<li>Average ACT Score: ' + result.latest.admissions.act_scores.midpoint.cumulative + '</li>';
  newHTML += '</ul>';
  newHTML += '</div>';
  newHTML += '<div class="col-sm">';
  newHTML += '<ul>';
  newHTML += '<li>Average SAT score: ' + result.latest.admissions.sat_scores.average.overall + '</li>';
  newHTML += '<li>Number of Students: ' + result.latest.student.enrollment.undergrad_12_month + '</li>';
  newHTML += '</ul>';
  newHTML += '</div>';
  newHTML += '</div>';
  newHTML += '<h6>Cost</h6>';
  newHTML += '<div class="row">';
  newHTML += '<div class="info-box-container">';
  newHTML += '</div>';
  newHTML += '<div class="col-sm">';
  newHTML += '<ul>';
  newHTML += '<li>Tution(In-State): $' + result.latest.cost.tuition.in_state + '</li>';
  newHTML += '<li>Tution(In-State): $' + result.latest.cost.tuition.out_of_state + '</li>';
  newHTML += '<li>Avg Total Cost:  $' + result.latest.cost.attendance.academic_year + '</li>';
  newHTML += '</ul>';
  newHTML += '</div>';
  newHTML += '<div class="col-sm">';
  newHTML += '<ul>';
  newHTML += '<li>Median earnings 10 years after graduation: $' + result.latest.earnings["10_yrs_after_entry"].median + '</li>';
  newHTML += '<li>Mean earnings 10 years after graduation: $' + result.latest.earnings["10_yrs_after_entry"].mean_earnings.middle_tercile + '</li>';
  newHTML += '</ul>';
  newHTML += '</div>';
  newHTML += '</div>';
  newHTML += '</div>';
  newHTML += '</div>';
  newHTML += '</a>';

  document.getElementById('search-result-container').innerHTML += newHTML

}
