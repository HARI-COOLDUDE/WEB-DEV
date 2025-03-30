from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/predict")
def predict():
    return render_template("index.html")  # Render the HTML page above

@app.route("/send-rsvp", methods=["POST"])
def send_rsvp():
    name = request.form.get("name")
    email = request.form.get("email")

    print(f"RSVP received from {name} ({email})")
    
    return f"Thank you, {name}! Your RSVP has been received."

if __name__ == "__main__":
    app.run(debug=True)