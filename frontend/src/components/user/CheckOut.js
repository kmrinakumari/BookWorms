import React from 'react'

const CheckOut = () => {
  return (
    <div>
    <section
  className="p-4 p-md-5"
  style={{
    backgroundImage:
      "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)"
  }}
>
  <div className="row d-flex justify-content-center">
    <div className="col-md-10 col-lg-8 col-xl-5">
      <div className="card rounded-3">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h3>Settings</h3>
            <h6>Payment</h6>
          </div>
          <form action="">
            <p className="fw-bold mb-4 pb-2">Saved cards:</p>
            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img
                className="img-fluid"
                src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
              />
              <div className="flex-fill mx-3">
                <div className="form-outline">
                  <input
                    type="text"
                    id="formControlLgXc"
                    className="form-control form-control-lg"
                    defaultValue="**** **** **** 3193"
                  />
                  <label className="form-label" htmlFor="formControlLgXc">
                    Card Number
                  </label>
                </div>
              </div>
              <a href="#!">Remove card</a>
            </div>
            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img
                className="img-fluid"
                src="https://img.icons8.com/color/48/000000/visa.png"
              />
              <div className="flex-fill mx-3">
                <div className="form-outline">
                  <input
                    type="text"
                    id="formControlLgXs"
                    className="form-control form-control-lg"
                    defaultValue="**** **** **** 4296"
                  />
                  <label className="form-label" htmlFor="formControlLgXs">
                    Card Number
                  </label>
                </div>
              </div>
              <a href="#!">Remove card</a>
            </div>
            <p className="fw-bold mb-4">Add new card:</p>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="formControlLgXsd"
                className="form-control form-control-lg"
                defaultValue="Anna Doe"
              />
              <label className="form-label" htmlFor="formControlLgXsd">
                Cardholder's Name
              </label>
            </div>
            <div className="row mb-4">
              <div className="col-7">
                <div className="form-outline">
                  <input
                    type="text"
                    id="formControlLgXM"
                    className="form-control form-control-lg"
                    defaultValue="1234 5678 1234 5678"
                  />
                  <label className="form-label" htmlFor="formControlLgXM">
                    Card Number
                  </label>
                </div>
              </div>
              <div className="col-3">
                <div className="form-outline">
                  <input
                    type="password"
                    id="formControlLgExpk"
                    className="form-control form-control-lg"
                    placeholder="MM/YYYY"
                  />
                  <label className="form-label" htmlFor="formControlLgExpk">
                    Expire
                  </label>
                </div>
              </div>
              <div className="col-2">
                <div className="form-outline">
                  <input
                    type="password"
                    id="formControlLgcvv"
                    className="form-control form-control-lg"
                    placeholder="Cvv"
                  />
                  <label className="form-label" htmlFor="formControlLgcvv">
                    CVV
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-success btn-lg btn-block">
              Add card
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</section>
</div>
  )
}

export default CheckOut;