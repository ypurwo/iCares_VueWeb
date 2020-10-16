<template>
  <div v-if="run">

    <iq-card
      class="wow fadeInUp"
      data-wow-delay="0.6s"
      :style="'width:'+img_data.width+';height:'+img_data.height"
    >
      <ul class="list-group list-group-horizontal">
        <li
          @click="click_erase(1)"
          :disabled="!erase"
          :class="!erase?'list-group-item active':'list-group-item'"
        >
          <i class="fa fa-pencil-alt"></i>
        </li>
        <li
          @click="click_erase(0)"
          :disabled="erase"
          :class="erase?'list-group-item active':'list-group-item' "
        >
          <i class="fa fa-eraser active"></i>
        </li>
        <li @click="undo()" class="list-group-item">
          <i class="fa fa-undo"><small v-if="undo_list.length>0" class="badge  badge-light float-right pt-1">{{undo_list.length}}</small></i>
        </li>
        <li @click="redo()" class="list-group-item">
          <i class="fa fa-redo"><small v-if="redo_list.length>0" class="badge  badge-light float-right pt-1">{{redo_list.length}}</small></i>
        </li>
        <li @click="create_text('first try')" class="list-group-item">
          <i class="fa fa-font"></i>
        </li>
        <li @click="download()" class="list-group-item">
          <i class="fa fa-save"></i>
        </li>
      </ul>
      <canvas
        :id="img_data.id"
        @mousedown="start"
        @mouseup="finish"
        @mouseleave="finish"
        @mousemove="draw"
      ></canvas>
      <!-- <button @click="click_erase">eraser</button>
      <button @click="load_image">reset_background</button>
      <button @click="download">download</button>
      <img :src="local_img" alt />-->
    </iq-card>
  </div>
</template>
<script>
import { object } from "@amcharts/amcharts4/core";
export default {
  name: "paint",
  data() {
    return {
      elem: null,
      canvas_elem: {},
      painting: false,
      line_width: 2,
      line_cap: "round",
      stroke_style: "black",
      erase: false,
      local_img: "",
      redo_list: [],
    undo_list: [],
    text_list:[],
    last_position:{
      x:0,y:0
    }
    };
  },
  props: {
    img_data: { type: Object },
  },
  mounted() {
    this.elem = document.getElementById(this.img_data.id);
    this.elem.height = this.img_data.height;
    this.elem.width = this.img_data.width;
    this.canvas_elem = this.elem.getContext("2d");
    this.load_image(this.img_data);
  },
  computed: {
    run() {
      let run = false;
      if (this.img_data) {
        run = true;
      }
      return run;
    },
  },
  methods: {
    create_text(text){
      console.log(text);
      let elem=document.getElementById(this.img_data.id);

      let elm_data={id:'text_id_'+this.text_list.length+1,x:elem.clientX,y:elem.clientY};
      var para = document.createElement("P");
      para.id=elm_data.id;

  para.innerText = text;
  // this.canvas_elem.draw()
  this.canvas_elem.fillText(text, this.last_position.x+4,this.last_position.y+4);
  // document.body.appendChild(para);

    },
    saveState(canvas, list, keep_redo) {
      console.log('saved');
      keep_redo = keep_redo || false;
      if(!keep_redo) {
        this.redo_list = [];
      }
      console.log(list);
     list?list.push(canvas.toDataURL()):this.undo_list.push(canvas.toDataURL());
    },
    undo() {
      this.restoreState(this.elem, this.canvas_elem,this.undo_list,this.redo_list ,'undo');
    },
    redo() {
      this.restoreState(this.elem, this.canvas_elem, this.redo_list,this.undo_list,'redo');
    },
    restoreState(canvas, ctx, pop,push, state) {
      if(pop.length) {
        this.saveState(canvas, push, true);
        if(state=='undo'){
          console.log('undo');
        var restore_state = pop.pop();
      //  push.push(restore_state);
        //this.undo_list[this.undo_list.length];
//         let temp_list=[];
//         console.log('length of undo is'+this.undo_list.length);
//         this.undo_list.forEach((element,ind) => {
//           if(ind!=this.undo_list.length-1)  {
//             console.log(ind);
// temp_list.push(element);
//           }
//         });
//         this.undo_list=temp_list;
        console.log(this.undo_list);

        }
        else{
        var restore_state = this.redo_list.pop();

        }

        // this.img_data=restore_state;
        let data=this.img_data;
        data.data=restore_state;
        this.load_image(data);
        // var img = new Element('img', {'src':restore_state});
        // img.onload = function() {
        //   ctx.clearRect(0, 0, 600, 400);
        //   ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);
        // }
      }
    },
    download() {
      // console.log(this.elem.toDataURL());
      this.local_img = this.elem.toDataURL();
      // this.$store.dispatch("gambar/save_gambar", {
      //   item: this.img_data.id,
      //   data: this.elem.toDataURL(),
      // });
    },
    load_image(img_data1) {
      // this.canvas_elem.globalCompositeOperation="source-over";
      var img = new Image();
      let img_data = img_data1;
      img.src = img_data.data;
      console.log(img_data);
      img.onload = function () {
        document
          .getElementById(img_data.id)
          .getContext("2d")
          .drawImage(img, 0, 0, img_data.height, img_data.width);
        document
          .getElementById(img_data.id)
          .getContext("2d").globalCompositeOperation = "source-over";
        // Or at whatever offset you like
      };
    },
    start(e) {
      this.painting = true;
      this.draw(e);
      console.log('started');
 this.saveState(this.elem);
    },
    finish(e) {
      this.painting = false;
      this.canvas_elem.beginPath();



    },
    click_erase(state) {
      state == 1 ? (this.erase = false) : (this.erase = true);
      console.log(state);
    },
    draw(e) {
      if (!this.painting) {
        return;
      } else {
        let boundry = this.elem.getBoundingClientRect();
        if (this.erase == true) {
          this.canvas_elem.globalCompositeOperation = "destination-out";
        } else {
          this.canvas_elem.globalCompositeOperation = "source-over";
        }
        // console.log(boundry);
        this.canvas_elem.lineWidth = this.line_width;
        this.canvas_elem.lineCap = this.line_cap;
        this.canvas_elem.strokeStyle = this.stroke_style;
        this.canvas_elem.lineTo(e.clientX - boundry.x, e.clientY - boundry.y);
        this.canvas_elem.stroke();
        this.canvas_elem.beginPath();
        this.canvas_elem.moveTo(e.clientX - boundry.x, e.clientY - boundry.y);
        this.last_position.x=e.clientX - boundry.x;
        this.last_position.y=e.clientY - boundry.y;

      }
    },
  },
};
</script>
<style>
</style>