<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Balance</span>
            <div class="text-900 font-medium text-xl">152</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-wallet text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">24 new </span>
        <span class="text-500">since last visit</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Price Per Share</span>
            <div class="text-900 font-medium text-xl">$2.100</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-percentage text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">%52+ </span>
        <span class="text-500">since last week</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Contract fee</span>
            <div class="text-900 font-medium text-xl">28441</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-flag text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">520 </span>
        <span class="text-500">newly registered</span>
      </div>
    </div>
    <div class="col-12 xl:col-12">
      <div class="card">
        <MvpComponent />
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Investments</h5>
        <DataTable
          :value="products"
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column style="width: 15%">
            <template #header> Date </template>
            <template #body="slotProps">
              {{
                slotProps.date ?? Math.floor(Math.random() * 10) + " sec ago"
              }}
            </template>
          </Column>
          <Column
            field="id"
            header="Transaction ID"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column
            field="amount"
            header="Amount"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width: 15%">
            <template #header> Inspect </template>
            <template #body>
              <Button
                icon="pi pi-search"
                type="button"
                class="p-button-text"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Growth Rate</h5>
        <div class="card">
          <h5>Contract Growth Chart</h5>
          <Chart type="line" :data="lineData" :options="lineOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/AppEventBus";
import ProductService from "../service/ProductService";
export default {
  data() {
    return {
      products: null,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Growth",
            data: [28, 48, 68, 102, 122, 145, 190],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      items: [
        { label: "Add New", icon: "pi pi-fw pi-plus" },
        { label: "Remove", icon: "pi pi-fw pi-minus" },
      ],
      lineOptions: null,
    };
  },
  productService: null,
  themeChangeListener: null,
  mounted() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.themeChangeListener = (event) => {
      if (event.dark) this.applyDarkTheme();
      else this.applyLightTheme();
    };
    EventBus.on("change-theme", this.themeChangeListener);

    if (this.isDarkTheme()) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  },
  beforeUnmount() {
    EventBus.off("change-theme", this.themeChangeListener);
  },
  created() {
    this.productService = new ProductService();
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      };
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
        },
      };
    },
  },
};
</script>
