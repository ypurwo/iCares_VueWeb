<template>
  <div v-if="data_igd">
    <div class="float-right" @click="save_assesment1()">
      <i class="fa fa-save">Simpan</i>
    </div>
    <br />
    <paint :img_data="img_data" />
    <br />
    <!-- <paint :img_data="img_data1" /> -->
  </div>
</template>
<script>
import paint from "../../../../components/sofbox/paint/paint";
export default {
  name: "assesment1",
  data() {
    return {
      img_data: {
        id: "assesment1_img1",
        height: "400",
        width: "400",
        data: "data:image/png;base64," + this.data_igd.nrAssIGD.Gambar,
      },
    };
  },
  props: {
    data_igd: { type: Object },
  },
  
  computed: {
    
    // img_data() {
    //   let img_data = {
    //     id: "assesment1_img1",
    //     height: "400",
    //     width: "400",
    //     data: "",
    //   };
    //   if (this.data_igd) {
    //     img_data.data =
    //       "data:image/png;base64," + this.data_igd.nrAssIGD.Gambar;
    //     // console.log(img_data.data)
    //   }
    //   return img_data;
    // },
  },
  methods: {
    save_assesment1() {
      
        let data =document.getElementById(this.img_data.id).toDataURL();
        let data_image=data.split(',');
        let nrAssIGD=this.data_igd.nrAssIGD;
        nrAssIGD.Gambar = data_image[1];
        // console.log(data_image);
      axios
        .post("/api/post_api", {
          method: "save_nrassigd",
          token: localStorage.getItem("token"),
          data: nrAssIGD,
        })
        .then((response) => {})
        .catch((e) => {});
    },
  },

  components: {
    paint,
  },
};
</script>
<style>
</style>