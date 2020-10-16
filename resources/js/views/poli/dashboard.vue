<template>
  <div v-if="docs" class="container">
    <!-- <div class="iq-card">
      <div class="iq-card-header d-flex justify-content-between">
        <div class="iq-header-title">
          <h4 class="card-title">Antrian Pasien POLIKLINIK RS MULYA</h4>
        </div>
        <div class="iq-card-header-toolbar d-flex align-items-center">
          <div class="dropdown">
            <span class="dropdown-toggle" id="dropdownMenuButton1" data-toggle="dropdown">
              <i class="ri-more-2-fill"></i>
            </span>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">
                <i class="ri-eye-fill mr-2"></i>View
              </a>
              <a class="dropdown-item" href="#">
                <i class="ri-delete-bin-6-fill mr-2"></i>Delete
              </a>
              <a class="dropdown-item" href="#">
                <i class="ri-pencil-fill mr-2"></i>Edit
              </a>
              <a class="dropdown-item" href="#">
                <i class="ri-printer-fill mr-2"></i>Print
              </a>
              <a class="dropdown-item" href="#">
                <i class="ri-file-download-fill mr-2"></i>Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="iq-card-body">
         <div class="row mt-2" v-for="(doc,ind) in docs" :key="ind">
            <div class="col-lg-4 mt-2">
              <div class="iq-card map-profile-card shadow-none">
               <div class="text-center mt-2 ml-4">
                  <div class="iq-card map-profile-card shadow-none">
                  <div class="iq-card-body">
                     <div class="media mb-1">
                        <img class="avatar-40 rounded-circle" src="/assets/images/user/1.jpeg" alt="">
                           <div class="media-body mb-3">
                           <h5 class="mb-0"><b>{{doc.NamaDokter}} </b></h5>
                           <p class="badge badge-primary font-weight-normal mb-0">Dokter</p>
                           </div>
                     </div>
                  </div>
               </div>
               </div>
               <div class="col-sm-2 text-center mt-0">
                  <div class="iq-card-body">
                     <div class="media mb-0">
                        <div class="d-flex align-items-center mb-1 mb-lg-0">
                        <div class="rounded-circle iq-card-icon iq-bg-danger mr-3"> <i class="ri-group-line"></i></div>
                        <div class="text-centre">
                        <h2 class="mb-0 align-items-center"><span class="counter" style="font-weight:bold">{{doc.JumlahPasien}}</span></h2>
                        <p class="badge badge-danger">Pasien</p>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-2 text-center mt-0">
                  <div class="iq-card-body">
                     <div class="media mb-0">
                        <div class="d-flex align-items-center mb-1 mb-lg-0">
                        <div class="rounded-circle iq-card-icon iq-bg-info mr-3"> <i class="ri-task-line"></i></div>
                        <div class="text-centre">
                        <h2 class="mb-0"><span class="counter" style="font-weight:bold">{{doc.AntrianSelesai}}</span></h2>
                        <p class="badge badge-success">Selesai</p>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-2 text-center mt-0">
                  <div class="iq-card-body">
                     <div class="media mb-0">
                        <div class="d-flex align-items-center mb-0 mb-lg-0">
                        <div class="rounded-circle iq-card-icon iq-bg-warning mr-3"> <i class="ri-message-3-line"></i></div>
                        <div class="text-centre">
                        <h2 class="mb-0"><span class="counter" style="font-weight:bold">{{doc.AntrianPoli}}</span></h2>
                        <p class="badge badge-warning">Antrian</p>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-sm-2 text-center mt-2">
                  <div class="iq-progress-bar-linear mt-2 mb-1 ml-2 mr-2">
                     <div class="iq-progress-bar counter progress progress" data-wow-delay="0.6s" style="visibility: visible;">
                        <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" class="progress-bar bg-primary"
                        :style="'transition: width 2s ease 0s; width:'+ ((doc.AntrianSelesai/doc.JumlahPasien)*100)+'%;'">
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            </div>

         </div>
      </div>
    </div> -->

    <div class="col-lg-12">
                     <div class="iq-card">
                        <div class="card-body">
                           <div class="row" >
                              <div class="col-lg-3 mt-4 track mr-2" v-for="(doc,ind) in docs" :key="ind" style="border:1px solid #ddd;border-radius:10px">
                                 <div class="iq-card shadow-none" >
                                    <div class="iq-card-body">
                                       <div class="media mb-3">
                                          <img class="avatar-40 rounded-circle" src="/assets/images/user/1.jpeg" alt="">
                                          <div class="media-body ml-4">
                                             <h5 class="mb-0"><b>{{doc.NamaDokter}}</b></h5>
                                             <p class="badge badge-primary font-weight-normal mb-0">Dokter</p>
                                          </div>
                                       </div>
                                       <div class="media mb-3">
                                          <img class="avatar-30 align-self-start" src="/assets/images/page-img/tag_blue.svg" alt="">
                                          <div class="media-body ml-3">
                                             <h6 class="mb-0">Pasien</h6>
                                             <p class="mb-0 counter"><small>{{doc.JumlahPasien}}</small></p>
                                          </div>
                                       </div>
                                       <div class="media mb-3">
                                          <img class="avatar-30 align-self-start" src="/assets/images/page-img/tag_yellow.svg" alt="">
                                          <div class="media-body ml-3">
                                             <h6 class="mb-0">Antrian Poli</h6>
                                             <p class="mb-0 counter"><small>{{doc.AntrianPoli}}</small></p>
                                          </div>
                                       </div>
                                       <div class="media mb-3">
                                          <img class="avatar-30 align-self-start" src="/assets/images/page-img/tag_red.svg" alt="">
                                          <div class="media-body ml-3">
                                             <h6 class="mb-0">Selesai</h6>
                                             <p class="mb-0 counter"><small>{{doc.AntrianSelesai}}</small></p>
                                          </div>
                                       </div>
                                       <div class="media mb-3">
                                          <img class="avatar-30" src="/assets/images/page-img/man.svg" alt="">
                                          <div class="media-body ml-3 align-self-center">
                                             <h6 class="mb-0 text-primary">Antrian Kasir</h6>
                                             <p class="mb-0 counter"><small>{{doc.AntrianKasir}}</small></p>
                                          </div>
                                       </div>
                                       <div class="media">
                                          <i class="ri-time-line font-size-24"></i>
                                          <div class="media-body ml-3 align-self-center">
                                             <h6 class="mb-0">Response Time <b class="text-danger">{{doc.ReponsTime}}</b></h6>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
   </div>
  </div>
</template>
<script>
import { sofbox } from "../../config/pluginInit";

export default {
  data() {
    return {
      docs: [],
      date: new Date(),
      all_visit: [],
    };
  },
  created() {
    this.fetch_freshdata();
    this.timer = setInterval(this.fetch_freshdata, 30000);
  },
  mounted() {},
  computed: {
    // all_visit() {
    // }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetch_freshdata() {
      axios
        .post("/get_antrianpoli", {})
        .then((response) => {
           this.docs=response.data.list_Antrian;
         //   this.all_visit=response.data.list_Antrian;
          sofbox.index()
        });
    },
  },
};
</script>
<style>
</style>