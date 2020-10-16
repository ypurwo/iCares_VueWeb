<template>
  <div>
    <!--  -->
    <iq-card>
      <template v-slot:body>
        <table class="table striped">
          <thead>
            <td>No MR</td>
            <td>File</td>
            <td>show</td>
          </thead>
          <tr v-for="(pdf, ind) in pdf_data" :key="ind">
            <td>
              {{ pdf.NoMR }}
            </td>
            <td>
              {{ pdf.pathFile }}
            </td>
            <td @click="update_pdf(pdf)">
              <b-button v-b-modal.modal-3 variant="primary" class="mr-1"
                >show</b-button
              >
            </td>
          </tr>
        </table>
        <input
          class="file-input"
          @change="upload_pdf($event, ind)"
          type="file"
          accept="application/pdf"
          name="resume"
        />
        <b-modal
          id="modal-3"
          size="xl"
          :title="cur_pdf.title"
          ok-title="Save Changes"
          cancel-title="Close"
        >
          <iframe
            style="width: 100%; max-height: 90%; max-width: 100%; height: 450px"
            :src="'http://localhost:8080/uploads/pdf/' + cur_pdf.path"
            alt
          />
        </b-modal>
      </template>
    </iq-card>
    <table class="table striped">
      <thead>
        <td>No MR</td>
        <td>NO Episode</td>
      </thead>

      <tr v-for="(mr, ind) in list_vist" :key="ind" @click="load(mr.NoMR)">
        <td>
          {{ mr.NoMR }}
        </td>
        <td>
          <!-- {{mr.}} -->
        </td>
      </tr>
    </table>
  </div>
</template><script>
import { sofbox } from "../../config/pluginInit";

export default {
  data() {
    return {
      upload: {
        NoMR: "",
        data: null,
      },
      pdf_data: [],
      cur_pdf: { title: "", path: "" },
      list_vist: [],
    };
  },
  mounted() {
    this.get_allvisit();
  },
  methods: {
    get_allvisit() {
      axios.post("/get_allvisit", {}).then((response) => {
        this.list_vist = response.data.list_visit;
        sofbox.index();
      });
    },
    update_pdf(pdf) {
      this.cur_pdf.path = pdf.pathFile;
      this.cur_pdf.title = pdf.pathFile.split(".")[0];
    },
    upload_pdf(e) {
      var fileReader = new FileReader();
      if (e.target.files[0].type != "application/pdf" && nama != 4) {
        confirm("Hanya bisa upload File PDF ,Tidak Bisa Image ( Gambar ) !");
      } else {
        // this.upload.pdf[nama].file = e.target.files[0].type;
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (e) => {
          this.upload.data = e.target.result;
          //   this.upload.pdf[nama].tobeupload = true;

          axios
            .post("/upload_pdf", this.upload)
            .then((response) => {
              // this.edit=false;
              this.load(this.upload.NoMR);
            })
            .catch(function (error) {
              this.upload.pdf[ind].loading = false;
              confirm(
                error.message.substr(error.message.length - 3, 3) == "413"
                  ? "Ukuran Maximal 5 MB"
                  : error.message
              );
            });
        };
      }
    },
    load(mr) {
      this.upload.NoMR = mr;
      axios
        .post("/get_all_pdf", { nomr: mr })
        .then((response) => {
          // this.edit=false;

          this.pdf_data = response.data.data;
        })
        .catch(function (error) {});
    },
  },
};
</script><style></style>