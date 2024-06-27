document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('invalid-error').textContent = '';

    let valid = true;

    if (!username) {
        document.getElementById('username-error').textContent = 'Username is required.';
        valid = false;
    }
    if (!password) {
        document.getElementById('password-error').textContent = 'Password is required.';
        valid = false;
    }

    if (!valid) return;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.status === 400) {
        if (result.username) {
            document.getElementById('username-error').textContent = result.username;
        }
        if (result.password) {
            document.getElementById('password-error').textContent = result.password;
        }
        if (result.invalid) {
            document.getElementById('invalid-error').textContent = result.invalid;
        }
    } else if (response.status === 200) {
        window.location.href = result.redirect;
    }
});

async function fetchLeaderboard() {
    try {
        const response = await fetch('/leaderboard');
        const leaderboardData = await response.json();
        updateLeaderboard(leaderboardData);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

function updateLeaderboard(leaderboardData) {
    const leaderboardTable = document.getElementById('leaderboard-table').querySelector('tbody');
    leaderboardTable.innerHTML = ''; // Clear previous data

    leaderboardData.forEach((entry, index) => {
        const row = leaderboardTable.insertRow();
        const rankCell = row.insertCell();
        const usernameCell = row.insertCell();
        const scoreCell = row.insertCell();
        const wpmCell = row.insertCell();

        rankCell.textContent = index + 1;
        usernameCell.textContent = entry.username;
        scoreCell.textContent = parseFloat(entry.percent).toFixed(2) + '%';
        wpmCell.textContent = entry.words_per_minute;
    });
}

function startTimer() {
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');

    const countdown = setInterval(function() {
        timerElement.textContent = timeLeft + 's';

        if (timeLeft <= 0) {
            clearInterval(countdown);

            let totalWords = $("#textBox").val().split(" ");
            $.ajax({
                url: "/misspelled_count",
                method: "POST",
                data: { words: totalWords }
            }).then(function(misspelledWord) {
                console.log('Misspelled Words Count:', misspelledWord); // Debugging
                let wpm = totalWords.length - misspelledWord;
                console.log('Words Per Minute:', wpm); // Debugging
                let percent = (wpm / totalWords.length).toFixed(2) * 100;
                console.log('Percentage:', percent); // Debugging

                $.ajax({
                    url: "/submit_score",
                    method: "POST",
                    data: { percent: percent, words_per_minute: wpm }
                }).done(function(data) {
                    console.log('Score submission response:', data); // Debugging
                });

                const row = `
                    <tr>
                        <td>${wpm}</td>
                        <td>${percent}%</td>
                    </tr>
                `;
                $("#score-body").append(row);
                $('#score-modal').modal("show");

            }).catch(function(error) {
                console.error('Error fetching misspelled words count:', error);
            });
        }

        timeLeft--;
    }, 1000);
}

var timerStarted = false
$("#textBox").one("input", function() {
    if (!timerStarted) {
        startTimer()
        timerStarted = true
    }
})

document.querySelector('.btn-close').addEventListener('click', function() {
    location.reload();
});

$('#textBox').on('paste', function(e){
    e.preventDefault();
    alert("Pasting is not allowed!")
});

// Fetch leaderboard when the page loads
fetchLeaderboard();