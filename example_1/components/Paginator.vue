<template>
  <div v-if="paginable">
    <button :disabled="item === 'next' ? pageNextDisabled : item === 'previous' ? pagePrevDisabled : false"
            v-for="item in pageList"
            :key="item"
            v-on:click="selectPage(item)">{{item}}</button>
    <span>current {{currentPage}}</span>
    <span>totalPages {{totalPages}}</span>
  </div>
</template>

<script>
  export default {
    name: 'paginator',
    props: {
      collection: {
        type: Array,
        required: true,
      },
      itemsPerPage: {
        type: Number,
        default: 10,
      },
      page: {
        type: Array,
      },
    },
    data() {
      return {
        currentPage: 1,
      };
    },
    computed: {
      paginable() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        this.$emit('update:page', this.collection.slice(start, end));
        return this.collection.length > this.itemsPerPage;
      },
      pagePrevDisabled() {
        return this.currentPage === 1;
      },
      pageNextDisabled() {
        return this.currentPage === this.totalPages;
      },
      totalPages() {
        return Math.ceil(this.collection.length / this.itemsPerPage);
      },
      pageList() {
        const pagesList = [];
        for (let i = 1; i <= this.totalPages + 2; i += 1) {
          if (i === 1) {
            pagesList.push('previous');
          } else if (i === this.totalPages + 2) {
            pagesList.push('next');
          } else {
            pagesList.push(i - 1);
          }
        }
        return pagesList;
      },
    },
    methods: {
      selectPage(page) {
        switch (page) {
          case 'previous': this.currentPage = this.currentPage - 1; break;
          case 'next': this.currentPage = this.currentPage + 1; break;
          default: this.currentPage = page;
        }
      },
    },
  };
</script>
