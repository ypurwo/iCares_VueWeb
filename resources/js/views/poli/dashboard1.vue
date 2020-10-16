<template>
  <div v-if="all_visit" class="container">
    <!-- <div>
      <h4 style="align-content:center">Antrean Poliklinik RS MULYA</h4>
      <h5 style="float:right">{{date | formatDate}}</h5>
    </div>
    <table class="table striped highlight">
      <thead>
        <tr>
          <th>Nama Dokter</th>
          <th>Jumlah Antrean</th>

          <th>Sudah Terlayani</th>

          <th>Belum Terlayani</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(doc,ind) in docs"
          :key="ind"
          :style="'background: linear-gradient(to right, #3D9EEF 0%,#EC7E8D '+(doc.Belum/doc.Jumlah)*100+'%'+',#EC7E8D 100%'+');color:black;font-weight:bold;font-size:18px;padding:2%'"
        >
          <td>
            <div class="chip">
              <img :src="'/images/avatar/'+doc.foto" alt class="circle" />
              <span
                class="title"
              >dr. {{doc.First_Name}} {{doc.Last_Name?'':doc.Last_Name}} {{doc.Spesialis}}</span>
            </div>
          </td>
          <td class="circle">{{doc.Jumlah}}</td>
          <td>{{doc.Selesai}}</td>
          <td>{{doc.Belum}}</td>
        </tr>
      </tbody>
    </table>-->
    <div class="iq-card">
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
          <div class="col-sm-4">
            <div class="d-flex align-items-center mb-3 mb-md-0">
                <div class="media-sellers">
                <div class="media-sellers-img">
                    <img src="/assets/images/user/1.jpeg" class="img-fluid rounded-circle w-50 h-50" alt />
                </div>
                <div class="media-sellers-media-info mt-4">
                    <h5 class="mb-0">
                    <a
                        class="text-dark " style="font-weight:bold"
                    >dr. {{doc.First_Name}} {{doc.Last_Name?'':doc.Last_Name}} {{doc.Spesialis}}</a>
                    </h5>
                </div>
                </div>
            </div>
          </div>
          <div class="col-sm-2 text-center mt-2">
            <div class="d-flex align-items-center mb-3 mb-md-0">
                <div class="rounded-circle iq-card-icon iq-bg-danger mr-3"> <i class="ri-group-line"></i></div>
                    <div class="text-centre">
                    <h2 class="mb-0"><span class="counter" style="font-weight:bold">{{doc.Jumlah}}</span></h2>
                    <p class="badge badge-danger">Pasien</p>
                    </div>
                </div>
          </div>
          <div class="col-sm-2 text-center mt-2">
            <div class="d-flex align-items-center mb-3 mb-lg-0">
                <div class="rounded-circle iq-card-icon iq-bg-info mr-3"> <i class="ri-task-line"></i></div>
                    <div class="text-centre">
                    <h2 class="mb-0"><span class="counter" style="font-weight:bold">{{doc.Selesai}}</span></h2>
                    <p class="badge badge-success">Selesai</p>
                    </div>
            </div>  
          </div>
          <div class="col-sm-2 text-center mt-2">
            <div class="d-flex align-items-center mb-3 mb-md-0">
                <div class="rounded-circle iq-card-icon iq-bg-warning mr-3"> <i class="ri-message-3-line"></i></div>
                <div class="text-centre">
                    <h2 class="mb-0"><span class="counter" style="font-weight:bold">{{doc.Belum}}</span></h2>
                    <p class="badge badge-warning">Antrian</p>
                </div>
            </div>
          </div>
          <div class="col-sm-2 text-center">
            <div class="iq-progress-bar">
              <span
                class="bg-success mt-5"
                data-percent="50"
                :style="'transition: width 2s ease 0s; width:'+ ((doc.Selesai/doc.Jumlah)*100)+'%;'"
              ></span>
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
        .post("/get_allvisit", {
          search: "",
          dok: "",
          tgl: this.date.yyyymmdd(),
        })
        .then((response) => {
          let temp = response.data.list_visit;
          let docs = [];
          // console.log(temp);
          if (temp != undefined) {
            temp.forEach((element) => {
              // console.log(element.Spesialis);
              if (element.Spesialis != null) {
                let exist = 0;
                docs.forEach((element1) => {
                  // console.log(element.Spesialis);
                  if (element1.First_Name == element.First_Name) {
                    element.Selesai == 1
                      ? (element1.Selesai += 1)
                      : (element1.Belum += 1);
                    element1.Jumlah += 1;
                    exist = 1;
                  }
                });
                if (exist == 0) {
                  docs.push({
                    First_Name: element.First_Name,
                    Selesai: element.Selesai == 1 ? 1 : 0,
                    Belum: element.Selesai == 1 ? 0 : 1,
                    Jumlah: 1,
                    Last_Name: element.Last_Name,
                    Spesialis: element.Spesialis,
                    foto: element.foto,
                  });
                }
              }
            });
          }
          this.docs = docs;
          this.docs.sort(function (a, b) {
            return parseInt(a.Jumlah) < parseInt(b.Jumlah);
          });
          sofbox.index();

          this.all_visit = temp;
        });
    },
  },
};
</script>
<style>
</style>