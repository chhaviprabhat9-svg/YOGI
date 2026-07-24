from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "birthday_secret"

CORRECT_PASSWORD = "11thDec"

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/verify", methods=["POST"])
def verify():

    entered_password = request.form["password"]

    if entered_password == CORRECT_PASSWORD:
        return redirect(url_for("first_page"))

    flash("Incorrect Password!")
    return redirect(url_for("home"))


@app.route("/next_page")
def first_page():
    return render_template("First_page.html")

@app.route("/second_page")
def second_page():
    return render_template("second_page.html")

@app.route("/third_page")
def third_page():
    return render_template("third_page.html")

@app.route("/fourth_page")
def fourth_page():
    return render_template("fourth_page.html")

@app.route("/fifth_page")
def fifth_page():
    return render_template("fifth_page.html")

@app.route("/sixth_page")
def sixth_page():
    return render_template("sixth_page.html")

@app.route("/seventh_page")
def seventh_page():
    return render_template("seventh_page.html")

@app.route("/eighth_page")
def eighth_page():
    return render_template("eighth_page.html")

if __name__ == "__main__":
    app.run(debug=True)