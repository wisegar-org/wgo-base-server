<template>
  <q-card class="my-card" flat>
    <q-card-section>
      <div class="row display-flex justify-center">
        <div class="col-12 col-md-3 image-div-justify">
          <q-img class="q-image-size" src="icons/favicon.png" />
        </div>

        <q-card-section
          class="
            col-12 col-sm-10 col-md-8 col-lg-7
            column
            display-flex
            justify-center
            self-center
          "
        >
          <div class="row display-flex" style="width: 100%; max-width: 800px">
            <div class="col-md-11 col-12 q-pa-sm" style="color: #accf5a">
              <div style="display: flex; justify-content: flex-start">
                <h4 class="q-pa-none q-ma-sm text-center">
                  DIMMI E IO DIMENTICO
                </h4>
              </div>
              <div style="display: flex; justify-content: center">
                <h4 class="q-pa-none q-ma-sm text-center">
                  INSEGNAMI E IO RICORDO
                </h4>
              </div>
              <div style="display: flex; justify-content: flex-end">
                <h4 class="q-pa-none q-ma-sm text-center">
                  COINVOLGIMI E IO IMPARO
                </h4>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-image-size {
  max-width: 300px;
  max-height: 300px;
}

.image-div-justify {
  justify-content: center;
  display: flex;
  align-self: right;
}
</style>
