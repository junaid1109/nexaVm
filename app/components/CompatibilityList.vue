<template>
  <div class="page">
    <div class="shell">
      <!-- SIDEBAR -->
      <aside class="panel sidebar" aria-label="Filters">
        <div class="section">
          <div class="section-title">Category</div>
          <select v-model="selectedCategory" class="select" @change="onFilterChange">
            <option value="all">All Categories</option>
            <option value="cpu">CPU</option>
            <option value="gpu">GPU</option>
            <option value="nic">NIC</option>
            <option value="storage">Storage Controllers</option>
            <option value="ssd">SSD</option>
            <option value="hdd">HDD</option>
          </select>
        </div>

        <div class="section">
          <div class="section-title">Manufacturer</div>
          <div class="chip-group">
            <button
              class="chip"
              :class="{ active: selectedManufacturer === 'all' }"
              @click="selectedManufacturer = 'all'; onFilterChange()"
            >
              All Manufacturers
            </button>
          </div>
          <div class="mfr-list">
            <button
              v-for="mfr in manufacturers"
              :key="mfr"
              class="mfr"
              :class="{ active: selectedManufacturer === mfr }"
              @click="toggleMfr(mfr)"
            >
              {{ mfr }}
            </button>
          </div>
        </div>

        <div class="section stats">
          <div class="section-title">Results</div>
          <div class="stat-row"><span>Showing:</span><strong>{{ visibleCount }}</strong></div>
          <div class="stat-row"><span>Total:</span><strong>{{ totalCount }}</strong></div>
          <div class="stat-row"><span>Page:</span><strong>{{ currentPage }} / {{ totalPages }}</strong></div>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="panel main">
        <header>
          <div class="title">NexaVM nSSV &amp; nCSSV Hardware Tested Components</div>
          <div class="controls">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search hardware, model, notes..."
              @input="onFilterChange"
            />
            <button class="btn" @click="exportCSV">Export CSV</button>
          </div>
        </header>

        <div class="table-wrap">
          <!-- CPU TABLE -->
          <section ref="cpuSection" class="tab-section" data-category="cpu">
            <h2 class="tab-title">CPU (<span class="cat-count">0</span> results)</h2>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th class="sortable" @click="sortBy('0')">Manufacturer <span class="sort-icon">{{ getSortIcon('0') }}</span></th>
                    <th class="sortable" @click="sortBy('1')">Model <span class="sort-icon">{{ getSortIcon('1') }}</span></th>
                    <th>Vendor</th>
                    <th>Platform</th>
                    <th>Family</th>
                    <th class="sortable" @click="sortBy('5')">Name <span class="sort-icon">{{ getSortIcon('5') }}</span></th>
                    <th class="sortable" @click="sortBy('6')">Cores <span class="sort-icon">{{ getSortIcon('6') }}</span></th>
                    <th>Core Speed</th>
                    <th>TDP</th>
                  </tr>
                </thead>
                <tbody ref="cpuBody">
                 <tr data-type="cpu" data-status="compatible"><td>Cisco</td><td>Cisco UCSB-B200-M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R390X G2</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2690 v4</td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR2-BO004</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2690 v4 </td><td>14</td><td>2.60 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Cisco</td><td>Cisco UCSB-B200-M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v3 </td><td>10</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v3 </td><td>10</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v3 </td><td>10</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v3 </td><td>10</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v3 </td><td>10</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v3 </td><td>10</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Cisco</td><td>Cisco UCSB-B200-M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v2 </td><td>8</td><td>2.00 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v2 </td><td>8</td><td>2.00 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Cisco</td><td>Cisco UCSB-B200-M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v2 </td><td>6</td><td>2.10 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R720xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v2 </td><td>6</td><td>2.10 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL388p Gen8</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v2 </td><td>6</td><td>2.10 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V2-8S</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v2 </td><td>6</td><td>2.10 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2620 v2 </td><td>6</td><td>2.10 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Cisco</td><td>Cisco UCSB-B200-M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620</td><td>6</td><td>2.00 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R620 </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620</td><td>6</td><td>2.00 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620</td><td>6</td><td>2.00 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R330  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E3</td><td>E3-1220 v5 </td><td>4</td><td>3.00 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R820  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-4640 v2 </td><td>10</td><td>2.20 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge M830</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-4610 v3 </td><td>10</td><td>1.70 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2699 v4 </td><td>22</td><td>2.20 GHz</td><td>145W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2697 v3 </td><td>14</td><td>2.60 GHz</td><td>145W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R620  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2690 v2 </td><td>10</td><td>3.00 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2682 v4 </td><td>16</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2682 v4 </td><td>16</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2682 v4 </td><td>16</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant BL460c Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I610-G20</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2680 v4 </td><td>14</td><td>2.40 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R620</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v2 </td><td>10</td><td>2.80 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R620  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v2 </td><td>10</td><td>2.80 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R620 </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v2 </td><td>10</td><td>2.80 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2678 v3 </td><td>12</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge C4130 </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2678 v3 </td><td>12</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I610-G20</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2678 v3 </td><td>12</td><td>2.50 GHz</td><td>120W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>QCT</td><td>Quanta D51B-1U</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2678 v3 </td><td>12</td><td>2.50 GHz</td><td>120W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2670 v3 </td><td>12</td><td>2.30 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R720xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2670 v2 </td><td>10</td><td>2.50 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2660 v4 </td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2660 v4 </td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2660 v3 </td><td>10</td><td>2.60 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v4 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R430 </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v4 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v4 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v4 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v4 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2650 v4 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650</td><td>8</td><td>2.00 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v4 </td><td>10</td><td>2.40 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v4 </td><td>10</td><td>2.40 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL388 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v4 </td><td>10</td><td>2.40 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v4 </td><td>10</td><td>2.40 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v4 </td><td>10</td><td>2.40 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v3 </td><td>8</td><td>2.60 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B390 G2</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v3 </td><td>8</td><td>2.60 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v3 </td><td>8</td><td>2.60 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v3 </td><td>8</td><td>2.60 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G20</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640 v3 </td><td>8</td><td>2.60 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2640 v3 </td><td>8</td><td>2.60 GHz</td><td>90W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2640</td><td>6</td><td>2.50 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B390 G2</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS R390X G2 </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G20</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5460M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2630 v4 </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v2 </td><td>6</td><td>2.60 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2623 v3 </td><td>4</td><td>3.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2623 v3 </td><td>4</td><td>3.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL388 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>HIKVISION</td><td>DS-VE22</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G20</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2620 v4 </td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R630 </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B390 G2</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL388 Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2620 v3 </td><td>6</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2609 v4 </td><td>8</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge M630</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2609 v4 </td><td>8</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2609 v3 </td><td>6</td><td>1.90 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge M620</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2609 v2 </td><td>4</td><td>2.50 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2609 v2 </td><td>4</td><td>2.50 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2609 v2 </td><td>4</td><td>2.50 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2603 v4 </td><td>6</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2603 v4 </td><td>6</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R420  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2420</td><td>6</td><td>1.90 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R920  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4809 v2 </td><td>6</td><td>1.90 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei CH242 V3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4809 v2 </td><td>6</td><td>1.90 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4809 v2 </td><td>6</td><td>1.90 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R930  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4850 v4 </td><td>16</td><td>2.10 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>System x3850 X6</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4850 v4 </td><td>16</td><td>2.10 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R930  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-8870 v4 </td><td>20</td><td>2.10 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R7625  </td><td>AMD-x86</td><td>AMD EPYC 9004</td><td>Genoa (4th Gen)</td><td>EPYC 9554</td><td>64</td><td>3.10 GHz</td><td>360W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8163</td><td>24</td><td>2.50 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8163</td><td>24</td><td>2.50 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8163</td><td>24</td><td>2.50 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>8163</td><td>24</td><td>2.50 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6348</td><td>28</td><td>2.60 GHz</td><td>235W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6348</td><td>28</td><td>2.60 GHz</td><td>235W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10 Plus</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6348</td><td>28</td><td>2.60 GHz</td><td>235W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6348</td><td>28</td><td>2.60 GHz</td><td>235W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6348</td><td>28</td><td>2.60 GHz</td><td>235W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6348</td><td>28</td><td>2.60 GHz</td><td>235W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge C6520  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6336Y </td><td>24</td><td>2.40 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6336Y </td><td>24</td><td>2.40 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6336Y </td><td>24</td><td>2.40 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6336Y </td><td>24</td><td>2.40 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR590 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6330</td><td>28</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6258R </td><td>28</td><td>2.70 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SD530 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248</td><td>20</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248R </td><td>24</td><td>3.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248R </td><td>24</td><td>3.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248R </td><td>24</td><td>3.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248R </td><td>24</td><td>3.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6248R </td><td>24</td><td>3.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6242</td><td>16</td><td>2.80 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge MX740c</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR2710P</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>SuperCloud</td><td>R8424 G11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN550 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240</td><td>18</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge C6420  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei XH321 V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029BT-HNC1R</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029TP-HC1R</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6240R </td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R840  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R940xa  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R6700 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6230</td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6226R </td><td>16</td><td>2.90 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6226R </td><td>16</td><td>2.90 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6226R </td><td>16</td><td>2.90 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6226R </td><td>16</td><td>2.90 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6226R </td><td>16</td><td>2.90 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6226R </td><td>16</td><td>2.90 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R540 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6138</td><td>20</td><td>2.00 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6138</td><td>20</td><td>2.00 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6132</td><td>14</td><td>2.60 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6132</td><td>14</td><td>2.60 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6132</td><td>14</td><td>2.60 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6132</td><td>14</td><td>2.60 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6132</td><td>14</td><td>2.60 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R940xa  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6130</td><td>16</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6126</td><td>12</td><td>2.60 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6126T </td><td>12</td><td>2.60 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5300 G4X</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5320</td><td>26</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR670 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5318Y </td><td>24</td><td>2.10 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R840  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B7800 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer F619H6-FT</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5220</td><td>18</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>AS-1114S-WTRT</td><td>AMD</td><td>AMD EPYC</td><td>EPYC Milan</td><td>7443</td><td>24</td><td>2.90 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 200</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 200K</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 2280 V2</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>KunLun</td><td>KunLun G2280</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR210K32  </td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR210K32</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 A1</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 Pro B1</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Digital China</td><td>KunTai R522</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5220</td><td>32</td><td>2.60 GHz</td><td>115W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 7049GP-TRT</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5220R </td><td>24</td><td>2.20 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B7800 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B5700 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3020 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>SuperCloud</td><td>R7410 G11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR860 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN850 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I420-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>S640-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5218</td><td>16</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN550 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkAgile VX 2U Node</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5218R </td><td>20</td><td>2.10 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R7525  </td><td>AMD-x86</td><td>AMD EPYC 7003</td><td>Milan (3rd Gen)</td><td>EPYC 7663</td><td>56</td><td>2.00 GHz</td><td>240W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Gigabyte</td><td>Gigabyte G481-HA0-ZB</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8179M </td><td>26</td><td>2.40 GHz</td><td>240W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R540  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R540 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3000 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei CH121 V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R8500 G4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120</td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R840  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B390 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 1288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR860 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5118</td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5117</td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5117</td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5117</td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5117</td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5117</td><td>14</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5115</td><td>10</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B7800 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5115</td><td>10</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5115</td><td>10</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei CH242 V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5115</td><td>10</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer 3000 G5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 1288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5500 G4X</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4316</td><td>20</td><td>2.30 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4314</td><td>16</td><td>2.40 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4314</td><td>16</td><td>2.40 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4314</td><td>16</td><td>2.40 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4314</td><td>16</td><td>2.40 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4314</td><td>16</td><td>2.40 GHz</td><td>135W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3800 G5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4314</td><td>16</td><td>2.40 GHz</td><td>135W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4310</td><td>12</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN550 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SD530 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4216</td><td>16</td><td>2.10 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4215R </td><td>8</td><td>3.20 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge C6420  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B5700 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4300 G3 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS B460 G3 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>S640-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer F629P3-RC1B</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>4214</td><td>12</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>SuperCloud</td><td>R5210 G11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X785-H30  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR588</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4210R </td><td>10</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R440  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4208</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4208</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B5700 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei CH121 V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>CB60-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G30</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114</td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114T </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4114T </td><td>10</td><td>2.20 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR2510P2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR550 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4110</td><td>8</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4108</td><td>8</td><td>1.80 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>GreatWall</td><td>DF723</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT2000</td><td>Phytium,FT-2000+/64</td><td>64</td><td>1.80 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>GreatWall</td><td>DF729</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT2000</td><td>Phytium,FT-2000+/64</td><td>64</td><td>1.80 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>GreatWall</td><td>DF720</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT2000</td><td>Phytium,FT-2000+/64</td><td>64</td><td>1.80 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF2180M3</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT2000</td><td>Phytium,FT-2000+/64</td><td>64</td><td>1.80 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR358FV2</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT2000</td><td>Phytium,FT-2000+/64</td><td>64</td><td>1.80 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>GreatWall</td><td>EF860</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT S2500</td><td>Phytium,S2500/64 C00</td><td>64</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR212F3</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT S2500</td><td>Phytium,S2500/64 C00</td><td>64</td><td>2.10 GHz</td><td>150W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3810 G5</td><td>Pyhtium-ARM</td><td>Pyhtium</td><td>FT S2500</td><td>Phytium,S2500/64 C00</td><td>64</td><td>2.10 GHz</td><td>150W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R390</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2695 v2 </td><td>12</td><td>2.40 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380p Gen8</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2695 v2 </td><td>12</td><td>2.40 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V2-8S</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2695 v2 </td><td>12</td><td>2.40 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V2-8S</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2695 v2 </td><td>12</td><td>2.40 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2695 v2 </td><td>12</td><td>2.40 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B390 G2</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD350</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 2028TP-DC1R</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5170M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2630 v3 </td><td>8</td><td>2.40 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8358</td><td>32</td><td>2.60 GHz</td><td>250W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8358</td><td>32</td><td>2.60 GHz</td><td>250W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R5300 G5 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8352Y </td><td>32</td><td>2.20 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8352Y </td><td>32</td><td>2.20 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5380</td><td>32</td><td>2.50 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5230HA  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5380</td><td>32</td><td>2.50 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240HO  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5380</td><td>32</td><td>2.50 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5380</td><td>32</td><td>2.50 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4950 G5  </td><td>AMD-x86</td><td>AMD EPYC 7003</td><td>Milan (3rd Gen)</td><td>EPYC 7713</td><td>64</td><td>2.00 GHz</td><td>225W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8260</td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei G530 V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8260</td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8260</td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5112M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8260</td><td>24</td><td>2.40 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8160</td><td>24</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8160</td><td>24</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8160</td><td>24</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8160</td><td>24</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 4th</td><td>Hygon 4</td><td>7490</td><td>64</td><td>2.70 GHz</td><td>400W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6416H</td><td>18</td><td>2.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6342</td><td>24</td><td>2.80 GHz</td><td>230W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6342</td><td>24</td><td>2.80 GHz</td><td>230W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6342</td><td>24</td><td>2.80 GHz</td><td>230W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6338</td><td>32</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6338</td><td>32</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6338</td><td>32</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>X640 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6338</td><td>32</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6338</td><td>32</td><td>2.00 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6326</td><td>12</td><td>3.60 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6326</td><td>12</td><td>3.60 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6326</td><td>12</td><td>3.60 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6326</td><td>12</td><td>3.60 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>X620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6326</td><td>12</td><td>3.60 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6238</td><td>22</td><td>2.10 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6238R </td><td>28</td><td>2.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6238R </td><td>28</td><td>2.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230N </td><td>20</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230N </td><td>20</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230N </td><td>20</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR860P</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230N </td><td>20</td><td>2.30 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6154</td><td>18</td><td>3.00 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6154</td><td>18</td><td>3.00 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6152</td><td>22</td><td>2.10 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R6700 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6148</td><td>20</td><td>2.40 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6148</td><td>20</td><td>2.40 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6148</td><td>20</td><td>2.40 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6140</td><td>18</td><td>2.30 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6140</td><td>18</td><td>2.30 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6140</td><td>18</td><td>2.30 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6140</td><td>18</td><td>2.30 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6140</td><td>18</td><td>2.30 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6134</td><td>8</td><td>3.20 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5418Y</td><td>24</td><td>2.00 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5380</td><td>32</td><td>2.50 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318N </td><td>24</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer B7800 G3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5215</td><td>10</td><td>2.50 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5215</td><td>10</td><td>2.50 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5215</td><td>10</td><td>2.50 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4416+</td><td>20</td><td>2.00 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V7</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4416+</td><td>20</td><td>2.00 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4214R </td><td>12</td><td>2.40 GHz</td><td>100W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR630 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4116</td><td>12</td><td>2.10 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant BL660c Gen8</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-4620</td><td>8</td><td>2.20 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant BL460c Gen9</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2683 v3 </td><td>14</td><td>2.00 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL360p Gen8</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2603</td><td>4</td><td>1.80 GHz</td><td>80W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 G7</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4820  </td><td>8</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 G7</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4850  </td><td>10</td><td>2.00 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I840-GS</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4850  </td><td>10</td><td>2.00 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7380</td><td>32</td><td>2.20 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Bronze</td><td>3106</td><td>8</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>SuperCloud</td><td>R6240 G11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Bronze</td><td>3104</td><td>6</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2683 v4 </td><td>16</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2683 v4 </td><td>16</td><td>2.10 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2680 v3 </td><td>12</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2658A v3 </td><td>12</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei CH121 V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2658 v2 </td><td>10</td><td>2.40 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2603 v3 </td><td>6</td><td>1.60 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4809 v3 </td><td>8</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4809 v3 </td><td>8</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4820 v2 </td><td>8</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4820 v2 </td><td>8</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4820 v2 </td><td>8</td><td>2.00 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4820 v3 </td><td>10</td><td>1.90 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4820 v4 </td><td>10</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885H V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4820 v4 </td><td>10</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4820 v4 </td><td>10</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4830 v2 </td><td>10</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885H V3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4830 v2 </td><td>10</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4830 v2 </td><td>10</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3  </td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4830 v3 </td><td>12</td><td>2.10 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7380</td><td>32</td><td>2.20 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X7340H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7380</td><td>32</td><td>2.20 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6230HA  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7380</td><td>32</td><td>2.20 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X7840H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7380</td><td>32</td><td>2.20 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7380</td><td>32</td><td>2.20 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7375</td><td>32</td><td>2.00 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X7340H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7375</td><td>32</td><td>2.00 GHz</td><td>140W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7375</td><td>32</td><td>2.00 GHz</td><td>140W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7375</td><td>32</td><td>2.00 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7375</td><td>32</td><td>2.00 GHz</td><td>140W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7360</td><td>24</td><td>2.20 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7360</td><td>24</td><td>2.20 GHz</td><td>125W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>QCT</td><td>Quanta D51B-1U</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2697 v4 </td><td>18</td><td>2.30 GHz</td><td>145W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 4048B-TR4FT-EC028</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4830 v4 </td><td>14</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4830 v4 </td><td>14</td><td>2.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8374C </td><td>36</td><td>2.70 GHz</td><td>270W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8352V </td><td>36</td><td>2.10 GHz</td><td>195W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Supermicro</td><td>SuperServer 2049U-TR4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>8280</td><td>28</td><td>2.70 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer CX5200 V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>8175M </td><td>24</td><td>2.50 GHz</td><td>240W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X7340H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X7840H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR658H V2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>7390</td><td>32</td><td>2.70 GHz</td><td>110W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 2</td><td>7265</td><td>24</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7265</td><td>24</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6230HA  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7265</td><td>24</td><td>2.20 GHz</td><td>185W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7265</td><td>24</td><td>2.20 GHz</td><td>185W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7265</td><td>24</td><td>2.20 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 200</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 200K</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>KunLun</td><td>KunLun 2280</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR212K  </td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR212K</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 A1</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Digital China</td><td>KunTai R2280</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>7260</td><td>64</td><td>2.60 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6230HA  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7260</td><td>24</td><td>2.20 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7260</td><td>24</td><td>2.20 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7255</td><td>16</td><td>2.20 GHz</td><td>180W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7255</td><td>16</td><td>2.20 GHz</td><td>180W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6330N </td><td>28</td><td>2.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6278C </td><td>26</td><td>2.60 GHz</td><td>185W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6266C </td><td>12</td><td>3.00 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230R </td><td>26</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230R </td><td>26</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6230R </td><td>26</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>6230R </td><td>26</td><td>2.10 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6151</td><td>18</td><td>3.00 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2488H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6150</td><td>18</td><td>2.70 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6150</td><td>18</td><td>2.70 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6150</td><td>18</td><td>2.70 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6139M </td><td>18</td><td>2.30 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240H0  </td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5390</td><td>16</td><td>2.90 GHz</td><td>195W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 3</td><td>5390</td><td>16</td><td>2.90 GHz</td><td>195W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2488H V6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>5320H </td><td>20</td><td>2.40 GHz</td><td>150W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5285</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5285</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5285</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5280</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5240H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5280</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R5230HA  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5280</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>H520-G30A</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>5280</td><td>16</td><td>2.50 GHz</td><td>130W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5217</td><td>8</td><td>3.00 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4109T </td><td>8</td><td>2.00 GHz</td><td>70W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4109T </td><td>8</td><td>2.00 GHz</td><td>70W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>AMD-x86</td><td>AMD EPYC 7002</td><td>Rome (2nd Gen)</td><td>EPYC 7742</td><td>64</td><td>2.25 GHz</td><td>225W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E5-2673 v4 </td><td>20</td><td>2.30 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4809 v4 </td><td>8</td><td>2.10 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4809 v4 </td><td>8</td><td>2.10 GHz</td><td>115W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8470M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4850 v2 </td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M3</td><td>Intel-x86</td><td>Intel Xeon</td><td>Kunpeng 920</td><td>E7-4850 v2 </td><td>12</td><td>2.30 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8358P </td><td>32</td><td>2.60 GHz</td><td>240W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8358P </td><td>32</td><td>2.60 GHz</td><td>240W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8357B </td><td>32</td><td>2.70 GHz</td><td>235W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8354H </td><td>18</td><td>3.10 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8276</td><td>28</td><td>2.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8276M </td><td>28</td><td>2.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR620C </td><td>Intel-x86</td><td>Intel Xeon</td><td>Platinum</td><td>8252C </td><td>12</td><td>3.80 GHz</td><td>240W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Hygon-C86</td><td>Hygon 3rd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R8450H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR658H V2</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7285</td><td>32</td><td>2.00 GHz</td><td>190W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7280</td><td>32</td><td>2.00 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>R6230HA  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7280</td><td>32</td><td>2.00 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X7840H0  </td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7280</td><td>32</td><td>2.00 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Suma</td><td>X745 H30</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7280</td><td>32</td><td>2.00 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5930 G2</td><td>Hygon-C86</td><td>Hygon 2nd</td><td>Hygon 2</td><td>7280</td><td>32</td><td>2.00 GHz</td><td>175W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6348H </td><td>24</td><td>2.30 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6346</td><td>16</td><td>3.10 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6256</td><td>12</td><td>3.60 GHz</td><td>205W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6254</td><td>18</td><td>3.10 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6226</td><td>12</td><td>2.70 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6142</td><td>16</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6142</td><td>16</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6136</td><td>12</td><td>3.00 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5318H </td><td>18</td><td>2.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5317</td><td>12</td><td>3.00 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR210K48</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>TSINGHUA TONGFANG</td><td>超强K620</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3820 G3</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 </td><td>Intel-x86</td><td>Intel Xeon</td><td>Bronze</td><td>3206R </td><td>8</td><td>1.90 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2650 v2 </td><td>8</td><td>2.60 GHz</td><td>95W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>Flex System x240 M5</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2637 v4 </td><td>4</td><td>3.50 GHz</td><td>135W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer SD330</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2450L</td><td>8</td><td>1.80 GHz</td><td>70W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel-x86</td><td>Intel Xeon</td><td>E7</td><td>E7-4880 v2 </td><td>15</td><td>2.50 GHz</td><td>130W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 200</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>TaiShan 200K</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>KunLun</td><td>KunLun 2280</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>PowerLeader</td><td>PR210K  </td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>
                 <!--<tr data-type="cpu" data-status="compatible"><td>Digital China</td><td>KunTai R2260</td><td>Kunpeng-ARM</td><td>Kunpeng 920</td><td>Kunpeng 920</td><td>5250</td><td>48</td><td>2.60 GHz</td><td>150W</td></tr>-->
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel-x86</td><td>Intel Xeon</td><td>E5</td><td>E5-2696 v2 </td><td>12</td><td>2.50 GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Sugon</td><td>A620-G30</td><td>AMD-x86</td><td>AMD EPYC 7001</td><td>Naples (1st Gen)</td><td>EPYC 7301</td><td>16</td><td>2.20 GHz</td><td>170W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5120T </td><td>14</td><td>2.20 GHz</td><td>105W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R7625</td><td>AMD-x86</td><td>AMD EPYC 9124</td><td>EPYC 9004 Series</td><td>EPYC 9124</td><td>16</td><td>3.00 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td> R6615</td><td>AMD-x86_64</td><td>AMD EPYC 9004</td><td>Zen 4 (Genoa)</td><td>EPYC 9124</td><td>16</td><td>3.00 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R6715</td><td>AMD-x86</td><td>AMD EPYC</td><td>9005</td><td>9015</td><td>16</td><td>3.60  GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6526Y</td><td>16</td><td>2.80 GHz</td><td>195W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge MX760c</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6434</td><td>8</td><td>3.00 GHz</td><td>195W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V7</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6430</td><td>32</td><td>2.10 GHz</td><td>270W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R260 </td><td>Intel-x86</td><td>Intel Xeon</td><td>6 Performance</td><td>6315P</td><td>8</td><td>2.80 GHz</td><td>177W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R360</td><td>Intel-x86</td><td>Intel Xeon</td><td>6 Performance</td><td>6315P</td><td>8</td><td>2.80  GHz</td><td>177W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6144</td><td>8</td><td>3.50 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>5515+</td><td>8</td><td>3.20 GHz</td><td>165W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4514Y</td><td>16</td><td>2.00 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4510</td><td>12</td><td>2.40 GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Silver</td><td>4509Y</td><td>8</td><td>2.60 GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td> R6615</td><td>AMD-x86_64</td><td>AMD EPYC 9004</td><td>Zen 4 (Genoa)</td><td>EPYC 9224</td><td>24</td><td>2.50 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge T360 </td><td>Intel-x86</td><td>Intel Pentium</td><td> </td><td>G7400</td><td>2</td><td>3.70 GHz</td><td>46W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R260</td><td>Intel-x86</td><td>Intel Pentium</td><td></td><td>G7400</td><td>2</td><td>3.70  GHz</td><td>46W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge T160</td><td>Intel-x86</td><td>Intel Pentium</td><td></td><td>G7400</td><td>2</td><td>3.70  GHz</td><td>46W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R360</td><td>Intel-x86</td><td>Intel Pentium</td><td></td><td>G7400</td><td>2</td><td>3.70  GHz</td><td>46W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge T550</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4310</td><td>12</td><td>2.10  GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R650</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4310</td><td>12</td><td>2.10  GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R450</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4310</td><td>12</td><td>2.10  GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge XR11</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4310</td><td>12</td><td>2.10  GHz</td><td>120W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge T560</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4509Y</td><td>8</td><td>2.60  GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R660</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4509Y</td><td>8</td><td>2.60  GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R660xs</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4509Y</td><td>8</td><td>2.60  GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge MX760c</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Gold 6430</td><td>32</td><td>2.10  GHz</td><td>270W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R6615</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004</td><td>9224</td><td>24</td><td>2.50  GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R6625</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004</td><td>9224</td><td>24</td><td>2.50  GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R6625</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004</td><td>9124</td><td>16</td><td>3.0  GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R6525</td><td>AMD-x86</td><td>AMD EPYC</td><td>7003</td><td>7443P</td><td>24</td><td>2.85  GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge XR5610</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Bronze 3408U</td><td>8</td><td>1.80  GHz</td><td>125W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge T360</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>6325P</td><td>8</td><td>3.50  GHz</td><td>0W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge T560</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4410Y</td><td>12</td><td>2.00  GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R660xs</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4410Y</td><td>12</td><td>2.00  GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R760xs</td><td>Intel-x86</td><td>Intel Xeon</td><td>Scalable</td><td>Silver 4410Y</td><td>12</td><td>2.00  GHz</td><td>150W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL345 Gen12</td><td>AMD-x86</td><td>AMD EPYC</td><td>9005</td><td>N/A</td><td>192</td><td>3.7 GHz</td><td>500W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL325 Gen12</td><td>AMD-x86</td><td>AMD EPYC</td><td>9005</td><td>N/A</td><td>192</td><td>3.7 GHz</td><td>500W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Dell</td><td>PowerEdge R7625</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004</td><td>9124</td><td>16</td><td>3.0  GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL385 Gen11</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004/9005</td><td>N/A</td><td>160</td><td>3.7 GHz</td><td>500W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL325 Gen11</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004/9005</td><td>N/A</td><td>192</td><td>3.7 GHz</td><td>500W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL365 Gen11</td><td>AMD-x86</td><td>AMD EPYC</td><td>9004/9005</td><td>N/A</td><td>160</td><td>3.7 GHz</td><td>500W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL145 Gen11</td><td>AMD-x86</td><td>AMD EPYC</td><td>8004</td><td>N/A</td><td>64</td><td>4.3 GHz</td><td>200W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL345 Gen11</td><td>AMD-x86</td><td>AMD EPYC</td><td>8004/9004</td><td>N/A</td><td>160</td><td>4.3 GHz</td><td>400W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL385 Gen10 Plus v2</td><td>AMD-x86</td><td>AMD EPYC</td><td>7003</td><td>N/A</td><td>128</td><td>3.5 GHz</td><td>280W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant DL345 Gen10 Plus</td><td>AMD-x86</td><td>AMD EPYC</td><td>7003</td><td>N/A</td><td>128</td><td>3.5 GHz</td><td>280W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>HPE</td><td>ProLiant Compute DL384 Gen12</td><td>NVIDIA</td><td>NVIDIA GH200 NVL2</td><td>N/A</td><td>N/A</td><td>0</td><td>0 GHz</td><td>0W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6544Y</td><td>16</td><td>3.60 GHz</td><td>270W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6544Y</td><td>16</td><td> 3.60 GHz</td><td>270W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V7</td><td>Intel-x86</td><td>Intel Xeon</td><td>Gold</td><td>6544Y</td><td>16</td><td> 3.60 GHz</td><td>270W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 1288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Bronze</td><td>3104</td><td>6</td><td>1.70 GHz</td><td>85W</td></tr>
                 <tr data-type="cpu" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>Intel-x86</td><td>Intel Xeon</td><td>Bronze</td><td>3104</td><td>6</td><td>1.70 GHz</td><td>85W</td></tr>
                               
                  <!-- ADD MORE CPU ROWS... -->
                </tbody>
              </table>
            </div>
          </section>

          <!-- STORAGE TABLE -->
          <section ref="storageSection" class="tab-section" data-category="storage">
            <h2 class="tab-title">Storage Controllers (<span class="cat-count">0</span> results)</h2>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th class="sortable" @click="sortBy('0')">Manufacturer <span class="sort-icon">{{ getSortIcon('0') }}</span></th>
                    <th class="sortable" @click="sortBy('1')">Model <span class="sort-icon">{{ getSortIcon('1') }}</span></th>
                    <th>Controller</th>
                    <th>RAID Levels</th>
                    <th>Chipset</th>
                  </tr>
                </thead>
                <tbody ref="storageBody">
                  <!-- PASTE ALL YOUR STORAGE <tr> ROWS HERE -->
 <tr data-type="storage" data-status="compatible"><td>Cisco</td><td>Cisco Systems UCSB-B200-M3</td><td>LSI-MRSASRoMB-4i</td><td>0, 1, 10</td><td>LSI SAS 2004</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>H755</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3916</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R7525</td><td>H755</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3916</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>H755</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3916</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>H750</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3916</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>H750</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3916</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>H745</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>H745</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 7049GP-TRT</td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6  </td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5  </td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5  </td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5  </td><td>AVAGO-MR9460-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>930-16i-4GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR658H V2  </td><td>930-16i-4GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658  </td><td>930-16i-4GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>H740P </td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>H740P </td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>H740P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2488H V5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>KunLun</td><td>KunLun 2280  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>KunLun</td><td>KunLun G2280</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR212K  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR210K  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M6</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>Digital China</td><td>KunTai R2280  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Digital China</td><td>KunTai R522 </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Digital China</td><td>KunTai R522</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr
<tr data-type="storage" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3820 G3  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>930-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590  </td><td>930-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>930-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850  </td><td>930-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R430  </td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge M830</td><td>H730P-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R930  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R920  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R840  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R540  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R940xa  </td><td>H730P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>H730-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>H730-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>H730-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>H730-Mini</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>GreatWall</td><td>DF723</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>GreatWall</td><td>DF729</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>GreatWall</td><td>EF860</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>GreatWall</td><td>DF720</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4300 G3</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS 3000 G5</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R6700 G3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3000 G3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 2049U-TR4  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR212F3  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR210K  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR2510P2</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR2710P</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>SuperCloud</td><td>R5210 G11  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>SuperCloud</td><td>R7410 G11  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF2180M3</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5460M4  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M5</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M4</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M6</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Nettrix</td><td>R620 G40  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Nettrix</td><td>R620 G30</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>H620-G30  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R5230HA  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R5240HO  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R6230HA  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>X7340H0</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I840-G30  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>A620-G30  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>H520-G30A  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I420-G30  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>S640-G30  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>ZTE</td><td>R8500 G4</td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3800 G5  </td><td>AVAGO-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>AVAGO-MR9364-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>AVAGO-MR9364-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>AVAGO-MR9364-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5  </td><td>LSI-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>LSI-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>LSI-MR9361-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>730-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590  </td><td>730-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658  </td><td>730-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850  </td><td>730-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR860P  </td><td>730-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR630  </td><td>730-8i-2GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>720ix</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>720i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>System x3850 X6</td><td>ServeRAID-M5210</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>System x3650 M5  </td><td>ServeRAID-M5210</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>ServeRAID-M5210</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I610-G20  </td><td>AVAGO MegaRAID SAS3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I620-G20  </td><td>AVAGO MegaRAID SAS3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>730-8i-1GB</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658  </td><td>730-8i-1GB</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850  </td><td>730-8i-1GB</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR860</td><td>730-8i-1GB</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R820  </td><td>H710P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R720xd</td><td>H710P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>H710P</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R720xd</td><td>H710</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>H710</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R620  </td><td>H710</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R420  </td><td>H710</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd  </td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730  </td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R640  </td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge M630</td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge C6420 </td><td>H330-Mini</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>H330</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>H330</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R630  </td><td>H330</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R540  </td><td>H330</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R440  </td><td>H330</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R330  </td><td>H330</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R720  </td><td>H310</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R720</td><td>H310</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R620  </td><td>H310</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge M620</td><td>H310</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M3</td><td>LSI-MR9240-8i</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>LSI-MR9240-8i</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 2008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750  </td><td>H355 </td><td>Only JBOD</td><td>LSI SAS 3816</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>H355 </td><td>Only JBOD</td><td>LSI SAS 3816</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge C6520</td><td>H345 </td><td>0, 1, 10</td><td>LSI SAS 3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2  </td><td>530-16i</td><td>0, 1, 10</td><td>LSI SAS 3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>530-16i</td><td>0, 1, 10</td><td>LSI SAS 3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs  </td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd  </td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R740  </td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R540  </td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge R940xa</td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Dell</td><td>PowerEdge MX740c</td><td>BOSS-S1</td><td>0, 1</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR212F3  </td><td>AHCI RAID</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3810 G5</td><td>AHCI RAID</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6  </td><td>9230-2i</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>9230-2i</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF2180M3</td><td>9230-2i</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2  </td><td>ThinkSystem M.2 with Mirroring Enablement Kit</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>ThinkSystem M.2 with Mirroring Enablement Kit</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>ThinkSystem M.2 with Mirroring Enablement Kit</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR670 V2</td><td>ThinkSystem M.2 with Mirroring Enablement Kit</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR358FV2</td><td>ThinkSystem M.2 with Mirroring Enablement Kit</td><td>0, 1, JBOD</td><td>Marvell 88SE9230</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>GreatWall</td><td>DF723</td><td>AHCI RAID</td><td>Only JBOD</td><td>Marvell 88SE9215</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>GreatWall</td><td>DF729</td><td>AHCI RAID</td><td>Only JBOD</td><td>Marvell 88SE9215</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2  </td><td>UN-RAID-2000-M2</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS R390X G2  </td><td>UN-RAID-2000-M2</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3  </td><td>UN-RAID-2000-M2</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>UN-RAID-2000-M2</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4  </td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5  </td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5  </td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5  </td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>PM8060</td><td>0, 1, 10, 5, 50, 6, 60</td><td>PM8060</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS B390 G2</td><td>P440ar</td><td>0, 1, 10, 5, 50, 6, 60</td><td>HPE Smart Array Gen9</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C FlexServer R390</td><td>P420i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>HPE Smart Array Gen8</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen9</td><td>P440ar</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL388 Gen9</td><td>P440ar</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL360p Gen8</td><td>P420i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380p Gen8</td><td>P420i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL388p Gen8</td><td>P420i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer B5700 G3</td><td>AVAGO-RAID-P5408-STD</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer B7800 G3</td><td>AVAGO-RAID-P5408-STD</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS B460 G3  </td><td>AVAGO-RAID-P5408-STD</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UIS B460 G3  </td><td>AVAGO-RAID-H5408-STD</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 G7</td><td>P410i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10 Plus</td><td>MR416i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant BL460c Gen9</td><td>P244br</td><td>0,1</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>HPE</td><td>HPE ProLiant BL660c Gen8</td><td>P220i</td><td>0,1</td><td>/</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3808</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3808</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3808</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3  </td><td>AVAGO-MR9460-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3808</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>KunLun</td><td>KunLun 2280  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 1288H V6  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>Digital China</td><td>KunTai R522  </td><td>AVAGO-MR9440-8i</td><td>0, 1, 10</td><td>LSI SAS 3408</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>530-8i</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SD530  </td><td>530-8i</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR550  </td><td>530-8i</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS 3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei G530 V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 2280 V2  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<!--<tr data-type="storage" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>-->
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5  </td><td>AVAGO-HW-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5  </td><td>AVAGO-XF-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6  </td><td>AVAGO-XF-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>AVAGO-XF-SAS3508</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3508</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>AVAGO-HW-SAS3416</td><td>0, 1, 10</td><td>Avago SAS3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800  </td><td>AVAGO-HW-SAS3416</td><td>0, 1, 10</td><td>Avago SAS3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR210K48  </td><td>AVAGO-HW-SAS3416</td><td>0, 1, 10</td><td>Avago SAS3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6  </td><td>AVAGO-XF-SAS3416</td><td>0, 1, 10, 5</td><td>Avago SAS3416</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5  </td><td>AVAGO-HW-SAS3408</td><td>0, 1, 10</td><td>Avago SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei CH121 V5  </td><td>AVAGO-HW-SAS3408</td><td>0, 1, 10</td><td>Avago SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei CH242 V5  </td><td>AVAGO-HW-SAS3408</td><td>0, 1, 10</td><td>Avago SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Huawei</td><td>Huawei XH321 V5  </td><td>AVAGO-HW-SAS3408</td><td>0, 1, 10</td><td>Avago SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5  </td><td>AVAGO-HW-SAS3408</td><td>0, 1, 10</td><td>Avago SAS 3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6  </td><td>AVAGO-XF-SAS3408</td><td>0, 1, 10</td><td>Avago SAS3408</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 2028TP-DC1R  </td><td>AVAGO-SMC3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029BT-HNC1R  </td><td>AVAGO-SMC3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029TP-HC1R  </td><td>AVAGO-SMC3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer F629P3-RC1B</td><td>AVAGO-SMC3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>SuperCloud</td><td>R6240 G11  </td><td>AVAGO-SMC3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom 3108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR  </td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR2-BO004  </td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5  </td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Nettrix</td><td>X640 G40</td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>H520-G30  </td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>H620-G30  </td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R6230HA  </td><td>AVAGO-MR9361-16i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>PowerLeader</td><td>PR210K32  </td><td>AVAGO-HW-SAS3516</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3516</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>LSI-MR9271-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2208</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I620-G10  </td><td>LSI-MR9271-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2208</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940  </td><td>LSI-MR9270CV-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2208</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940  </td><td>LSI-MR9260-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>LSI-MR9260-8i</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>ServeRAID-M5015</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I840-GS</td><td>SMC-SMC2108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS 2108</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer SD330</td><td>LSI-MegaRAID-8708EM2</td><td>0, 1, 10, 5, 50</td><td>LSI SAS 1078</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>Flex System x240 M5 </td><td>Lenovo-ServeRAID-M1210e</td><td>0, 1, 10</td><td>LSI SAS 3008</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR658H V2  </td><td>940-8i-4GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom SAS3908</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>940-16i-4GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Broadcom SAS3916</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650  </td><td>930-24i-4GB</td><td>0, 1, 10, 5, 50, 6, 60</td><td>LSI SAS3508 + SAS35x36R</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN550  </td><td>530-4i</td><td>0, 1, 10, 5</td><td>LSI SAS 3404</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN850  </td><td>530-4i</td><td>0, 1, 10, 5</td><td>LSI SAS 3404</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Nettrix</td><td>R620 G40  </td><td>AVAGO-MR-SAS3316</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Suma</td><td>R6240H0  </td><td>AVAGO-MR-SAS3316</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I840-G30  </td><td>AVAGO-MR-SAS3316</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3316</td><td></td><td></td></tr>
<tr data-type="storage" data-status="compatible"><td>Sugon</td><td>I620-G20  </td><td>AVAGO-SAS3108</td><td>0, 1, 10, 5, 50, 6, 60</td><td>Avago SAS3108</td><td></td><td></td></tr>
                  <!-- ADD MORE STORAGE ROWS... -->
                </tbody>
              </table>
            </div>
          </section>

          <!-- GPU TABLE -->
          <section ref="gpuSection" class="tab-section" data-category="gpu">
            <h2 class="tab-title">GPU (<span class="cat-count">0</span> results)</h2>
            <div class="table-scroll">
              <table>
                <thead>
                 <tr><th>Vendor</th><th>Model</th><th>Memory</th><th>GPU Passthrough</th><th>vGPU Support</th></tr>
                </thead>
                <tbody ref="gpuBody">
                  <tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>H200 NVL</td><td>141 GB HBM3e</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 6000 Blackwell Server Edition</td><td>96 GB GDDR7 with ECC </td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 6000 Blackwell Workstation Edition</td><td>96 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 6000 Blackwell Max-Q Workstation Edition</td><td>96 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 2000 Blackwell</td><td>96 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 6000 Blackwell Max-Q Workstation</td><td>96 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>H100 NVL</td><td>94 GB HBM3</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A100 80GB</td><td>80 GB HBM2e</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>H800 </td><td>80 GB HBM2e</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>H100</td><td>80 GB HBM2e</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A16</td><td>64 GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>L40S </td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>L40</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>L20</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 6000 Ada</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 5880 Ada</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A6000</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A40</td><td>48 GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 6000E Ada</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 6000 Ada</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A6000E</td><td>48 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A400</td><td>48 GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 5000 Blackwell</td><td>48 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A800 40GB Active</td><td>40 GB HBM2</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 5000 Ada</td><td>32 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 5000E Ada</td><td>32 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 5000 Ada</td><td>32 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 4500 Blackwell </td><td>32 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W6800</td><td>32 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>R9700</td><td>32 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W9100 32GB</td><td>32 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S9170</td><td>32 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>Duo</td><td>32 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>V620</td><td>32 GB GDDR6</td><td>TRUE</td><td>FALSE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>V710</td><td>28 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>L4</td><td>24 GB GDDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>L2</td><td>24 GB GDDR6</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A10</td><td>24GB GDDR6</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A5000</td><td>24 GB GDDR6</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A30</td><td>24 GB HBM2</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A5500</td><td>24 GB DDR6 with ECC</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 4500 Ada</td><td>24 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 4500 Ada</td><td>24 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A5000E</td><td>24 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 4000 Blackwell</td><td>24 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX PRO 4000 SFF Blackwell </td><td>24 GB GDDR7 with ECC </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 4000E Ada</td><td>20 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 4000 Ada </td><td>20 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 4000 Ada</td><td>20 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 4000 SFF Ada</td><td>20 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A4500 </td><td>20 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A2</td><td>16 GB GDDR6</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S7150 X2</td><td>16 GB GDDR5</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 2000 Ada</td><td>16 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 2000 Ada</td><td>16 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 2000 Ada</td><td>16 GB GDDR6 with ECC</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>5000 Ada</td><td>16 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A4000</td><td>16 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A4000H</td><td>16 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A4000E </td><td>16 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A4500</td><td>16 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W9100</td><td>16 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S9150</td><td>16 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 9100</td><td>16 GB HBM2</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>SSG</td><td>16 GB HBM2</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>Radeon™ Vega Frontier Edition (Liquid-cooled)</td><td>16 GB HBM2</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>Radeon™ Vega Frontier Edition (Air-cooled)</td><td>16 GB HBM2</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>Radeon™ Pro VII</td><td>16 GB HBM2</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>35000 Ada</td><td>12 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A2000 12GB </td><td>12 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A2000E</td><td>12 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S10000 12GB Edition</td><td>12 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S9050</td><td>12 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S9100</td><td>12 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S7150 (Active Cooling)</td><td>8 GB GDDR5</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S7150 (Passive Cooling)</td><td>8 GB GDDR5</td><td>TRUE</td><td>TRUE</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>2000A </td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A1000 </td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A2000</td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T1000 </td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T1000E 8GB</td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T1000E</td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5700</td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5500</td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>V520</td><td>8 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W8100</td><td>8 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W7100</td><td>8 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S7100X</td><td>8 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 7100</td><td>8 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 5100</td><td>8 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 7100 (Mobile)</td><td>8 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S9300 X2</td><td>8 GB HBM</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 8200</td><td>8 GB HBM2</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A2000</td><td>6 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX 3000</td><td>6 GB GDDR6 </td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W9000</td><td>6 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S10000</td><td>6 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S10000 (Active Cooling)</td><td>6 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S9000</td><td>6 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>RTX A400</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A1000</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>A500</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T1000</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T600</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T600E</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>NVIDIA</td><td>T400E</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W6500M</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W6400</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5500M (Mobile)</td><td>4 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W8000</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W7000</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S7000</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5100</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W4300</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W6150M</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W7170M</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 3200</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 3200 (Mobile)</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 4100</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 3100</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 4170 (Mobile)</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 4150 (Mobile)</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 4130 (Mobile)</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 3100 (Mobile)</td><td>4 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W6300M</td><td>2 GB GDDR6</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W4100</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5000</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5000 DVI</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W600</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>S4000X</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>R5000</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5170M</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W5130M</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W4190M</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W4170M</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 2100</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>WX 2100 (Mobile)</td><td>2 GB GDDR5</td><td>TRUE</td><td>-</td></tr>
<tr data-type="gpu" data-status="compatible"><td>AMD</td><td>W2100</td><td>2 GB DDR3</td><td>TRUE</td><td>-</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- NIC TABLE -->
          <section ref="nicSection" class="tab-section" data-category="nic">
            <h2 class="tab-title">NIC (<span class="cat-count">0</span> results)</h2>
            <div class="table-scroll">
              <table>
                <thead>
                 <tr><th>Manufacturer</th><th>Model</th><th>Name</th><th>Type</th><th>Port Speed</th><th>Notes</th></tr>
                </thead>
                <tbody ref="nicBody">
                 	<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>QLogic QL41000</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>QLogic QL41000</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>QLogic QL41000</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>QLogic QL41000</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R7625</td><td>Mellanox CX-6 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel XXV710 </td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge MX740c</td><td>Intel XXV710 </td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029BT-HNC1R</td><td>Intel XXV710 </td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C6420</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C6520</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R840</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>EF860</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF723</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF729</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380 Gen9</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL388 Gen9</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei G530 V5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer F619H6-FT</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer F629P3-RC1B</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M4</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR588 V2</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR658H V2</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R522</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>A620-G30</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>H520-G30A</td><td>Intel X710 </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel X550</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 7049GP-TRT</td><td>Intel X550</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>QCT</td><td>Quanta D51B-1U</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-GS</td><td>Intel X540-AT2</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Gigabyte</td><td>Gigabyte G481-HA0-ZB</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R8424 G11</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7340H0</td><td>Intel X550T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R820</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 Gen10</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel X520</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M620</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C4130</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R620</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R720</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R920</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF720</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF723</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 PKG</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C R4300 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C R4900 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C R4900 G5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer 3000 G5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380 Gen9</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL388 Gen9</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 Gen10</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL360p Gen8</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380p Gen8</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V2-8S</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH5885H V3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei CH121 V5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V2-8S</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei CH242 V3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR2</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR2510P2-801022510014</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR2510P2-8030425105432</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR2710P</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 1288H V6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2488H V6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5210 G11</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R8424 G11</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R6240 G11</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF2180M3</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5170M4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5460M4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR860</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7340H0</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-C30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X785-H30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X745 H30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>CB60-G30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>H520-G30A</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I610-G20</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G20</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I420-G30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>S640-G30</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R8500 G4</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3810 G5</td><td>Intel 82599ES</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M620</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M630</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M830</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R720xd</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Gigabyte</td><td>Gigabyte G481-HA0-ZB</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4950 G5</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C Technologies UIS R390X G2</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R390X G2</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3000 G3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3020 G3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C FlexServer R390</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380p Gen8</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR620C</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3800 G5</td><td>Broadcom BCM57810</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R840</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R940xa</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R5300 G5</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3850 X6</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!-- <tr data-type="nic" data-status="compatible"><td>TSINGHUA TONGFANG</td><td>CQ K620</td><td>Broadcom BCM57412</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M630</td><td>Broadcom BCM57840</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS B390 G2</td><td>Broadcom BCM57840</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant BL460c Gen9</td><td>Broadcom BCM57840</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant BL460c Gen9</td><td>Broadcom BCM57840</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C6520</td><td>Broadcom BCM57504</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Broadcom BCM57416</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Broadcom BCM57416</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Broadcom BCM57416</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R7525</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR860P</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR670 V2</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen11</td><td>Broadcom BCM57414</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Broadcom BCM57402</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Gigabyte</td><td>Gigabyte G481-HA0-ZB</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant BL460c Gen9</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380 Gen9</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 4048B-TR4FT</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Mellanox CX-3 Pro</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>EF860</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 PKG</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>KunLun</td><td>KunLun 2280</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5112M5</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>TSINGHUA TONGFANG</td><td>CQ K620</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7840H0</td><td>Mellanox CX-5</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 PKG</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4950 G5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>KunLun</td><td>KunLun 2280</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029TP-HC1R</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2049U-TR4</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K32</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR223K</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR212K</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5210 G11</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 A1</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 Pro B1</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R6240H0</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>TSINGHUA TONGFANG</td><td>CQ K620</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R2260</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R2280</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R522</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7840H0</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240HO</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R8450H0</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7340H0</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G30</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4X</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5500 G4X</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5930 G2</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3820 G3</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Mellanox CX-4 Lx</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Mellanox CX-4</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>QCT</td><td>Quanta D51B-1U</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>Flex System x240 M5 Compute Node</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR620C</td><td>Mellanox CX-3</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel E810-XVV</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel E810-XVV</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 1288H V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488H V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei G530 V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei XH321 V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei CH121 V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei CH242 V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer CX5200 V5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SD530</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR550</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR630</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 MLK SVT</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN550</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN850</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G30</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I420-G30</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R8500 G4</td><td>Intel X722</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Broadcom BCM57302</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Broadcom BCM57302</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel 82599</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel 82599</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel 82599</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 2280 V2</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>KunLun</td><td>KunLun 2280</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>KunLun</td><td>KunLun G2280</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>100Trust</td><td>TS02F-F30</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K32</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR223K</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR212K</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR210K48</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!-- <tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 A1</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 Pro B1</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<<tr data-type="nic" data-status="compatible"><td>TSINGHUA TONGFANG</td><td>CQ K620</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R2260</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R2280</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Digital China</td><td>KunTai R522</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3820 G3</td><td>Huawei TM280</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Huawei Hi1822</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Huawei Hi1822</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Huawei Hi1822</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>KunLun</td><td>KunLun G2280</td><td>RP1000P2SFP </td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 7049GP-TRT</td><td>Intel X710 -T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel X710 -T</td><td>SFP/SFP+/QSFP</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel XL710</td><td>SFP/SFP+/QSFP</td><td>10/40Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Broadcom BCM57454</td><td>SFP/SFP+/QSFP</td><td>10/25Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M620</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge M630</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C4130</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C6420</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R620</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R720</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R820</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Gigabyte</td><td>Gigabyte G481-HA0-ZB</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF720</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF723</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>GreatWall</td><td>DF729</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 PKG</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 6000 G3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C R4300 G3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C R4900 G3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C R4900 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C Technologies UIS R390X G2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer 3000 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R5300 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R390X G2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380 Gen9</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10 Plus</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 1288H V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488H V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei G530 V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V2-8S</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH5885H V3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029TP-HC1R</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2049U-TR4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 4048B-TR4FT</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2028TP-DC1R</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 2029BT-HNC1R</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer F619H6-FT</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>SuperServer F629P3-RC1B</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR212K</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>HIKVISION</td><td>DS-VE22</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF2180M3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5170M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5460M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8460M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8470M3</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3850 X6</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SD330</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD650</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR588 V2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR658H V2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SD530</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R6240H0</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>X640 G40</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7840H0</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R5240HO</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>R8450H0</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X7340H0</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>H620-C30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X785-H30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Suma</td><td>X745 H30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>CB60-G30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>A620-G30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>H520-G30A</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I610-G20</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G20</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-GS</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5930 G2</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R8500 G4</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3800 G5</td><td>Intel i350</td><td>RJ45</td><td>1Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Broadcom BCM57800</td><td>RJ45</td><td>10Gb</td><td></td></tr>
<tr Fdata-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R620</td><td>Broadcom BCM57800</td><td>RJ45</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Broadcom BCM57800</td><td>RJ45</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Broadcom BCM57800</td><td>RJ45</td><td>10Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R7625</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R630</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R720</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge C6520</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R840</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R920</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R420</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R940xa</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R720xd</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R330</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R430</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R440</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R7525</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Broadcom BCM5720</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C FlexServer R390</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380 Gen9</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL388 Gen9</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL580 Gen10</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL360p Gen8</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL380p Gen8</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL388p Gen8</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>HPE</td><td>HP ProLiant DL580 G7</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V2-8S</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR860</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR630</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR670 V2</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Broadcom BCM5719</td><td>RJ45</td><td>1Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4700 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UniServer R6900 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3000 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3020 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>AS-1114S-WTRT</td><td>Broadcom BCM57416 NetXtreme-E</td><td>SFP/SFP+/QSFP</td><td>25/10/1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Supermicro</td><td>AS-1114S-WTRT</td><td>NIC Intel X550</td><td>RJ45</td><td>10Gb/5Gb/2.5Gb/1Gb/100Mb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488 V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 5885H V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 1288H V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei 2488H V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei Atlas 800</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei XH321 V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR2510P2-801022510014</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR2510P2-8030425105432</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR2710P</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer CX5200 V5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>SuperCloud</td><td>R5210 G11</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M5</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR850</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR860P</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR550</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR590</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR860</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Nettrix</td><td>R620 G30</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G30</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I420-G30</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>S640-G30</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R8500 G4</td><td>Intel X722</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V2-8S</td><td>Intel 82580</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>Intel 82580</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RQ940</td><td>Intel 82580</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V2-8S</td><td>Intel 82576</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel 82576</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel 82576</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel 82576</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I840-GS</td><td>Intel 82576</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel 82571EB</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel 82571EB</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel 82571EB</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>PowerLeader</td><td>PR212F3</td><td>SF400HT</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>SF400T</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>SF400T</td><td>RJ45</td><td>1Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel 82575EB</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel 82575EB</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>SF200T</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>SF200T</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>SF200T</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Intel i210</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<!--<tr data-type="nic" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>Intel i210</td><td>RJ45</td><td>1Gb</td><td></td></tr>-->
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5300 G4X</td><td>Intel i210</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>ZTE</td><td>R5500 G4X</td><td>Intel i210</td><td>RJ45</td><td>1Gb</td><td></td></tr>
<tr data-type="nic" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD640</td><td>Intel 82574L</td><td>RJ45</td><td>1Gb</td><td></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- SSD TABLE -->
          <section ref="ssdSection" class="tab-section" data-category="ssd">
            <h2 class="tab-title">SSD (<span class="cat-count">0</span> results)</h2>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr><th>Manufacturer</th><th>Model</th><th>Vendor</th><th>Name</th><th>Size</th><th>Capacity</th><th>Interface</th><th>DWPD</th><th>Notes</th></tr>
                </thead>
                <tbody ref="ssdBody">
                 <tr data-type="ssd" data-status="compatible"><td>Samsung</td><td> </td><td>Samsung</td><td>MZILG3T8HCLS</td><td>2.50</td><td>3.84TB</td><td>SAS</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Samsung</td><td> </td><td>Samsung</td><td>MZQL21T9HCJR-00A07</td><td>U.2</td><td>1.92TB</td><td>PCIe 4.0 x4</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>Toshiba</td><td>PX05S</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Toshiba</td><td>PX05SM</td><td>2.50</td><td>400GB</td><td>SATA</td><td>10.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Kioxia</td><td>RM5-V</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Kioxia</td><td>RM5-V</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Kioxia</td><td>RM5 </td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Kioxia</td><td>PM5-M</td><td>2.50</td><td>400GB</td><td>SATA</td><td>10.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Kioxia</td><td>PM5-M</td><td>2.50</td><td>400GB</td><td>SATA</td><td>10.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Toshiba</td><td>HK4E</td><td>2.50</td><td>800GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>SK Hynix</td><td>SE5100</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>SK Hynix</td><td>SE5100</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R7625</td><td>SK Hynix</td><td>SE5100</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R540</td><td>Samsung</td><td>PM1643a</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Samsung</td><td>SM863</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Samsung</td><td>SM863</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge C4130</td><td>Samsung</td><td>PM863</td><td>2.50</td><td>960GB</td><td>SATA</td><td>0.78</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Micron</td><td>5300 MAX</td><td>2.50</td><td>960GB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Micron</td><td>5300 MAX</td><td>2.50</td><td>960GB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Micron</td><td>5300 MAX</td><td>2.50</td><td>960GB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Kioxia</td><td>PM7</td><td>2.50</td><td>800GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Kioxia</td><td>PM6-R</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4620</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Intel</td><td>S4620</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R750xs</td><td>Intel</td><td>S4510</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R620</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R7625</td><td>Intel</td><td>S4520</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>2.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730</td><td>Intel</td><td>S3520</td><td>2.50</td><td>800GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>Intel</td><td>S3520</td><td>2.50</td><td>800GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R930</td><td>Intel</td><td>S3520</td><td>2.50</td><td>800GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S3510</td><td>2.50</td><td>800GB</td><td>SATA</td><td>0.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R730xd</td><td>Intel</td><td>S3500</td><td>2.50</td><td>800GB</td><td>SATA</td><td>0.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R640</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Dell</td><td>PowerEdge R740xd</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<!--<tr data-type="ssd" data-status="compatible"><td>Digital China</td><td>KunTai R2280</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>-->
<tr data-type="ssd" data-status="compatible"><td>GreatWall</td><td>DF729</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>GreatWall</td><td>EF860</td><td>Intel</td><td>S4510</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS R390X G2</td><td>Toshiba</td><td>HK4E</td><td>2.50</td><td>800GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS R390X G2</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C R4300 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3000 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3010 G3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4620</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4620</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4620</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3020 G3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Intel</td><td>S4520</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>2.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4520</td><td>2.50</td><td>480GB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G6</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 PKG</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4930 G5 H3 PKG</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4950 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UIS-Cell 3030 G3</td><td>Micron</td><td>5200</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>Micron</td><td>5200</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Micron</td><td>5200</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2</td><td>Micron</td><td>5200</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G2</td><td>Micron</td><td>5200</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R6700 G3</td><td>Micron</td><td>5200</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R6700 G3</td><td>Micron</td><td>5200</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C R4900 G3</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>H3C</td><td>H3C UniServer R4900 G3</td><td>YANGTZE MEMORY</td><td>SE005</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4620</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>Intel</td><td>S4520</td><td>2.50</td><td>480GB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>HPE</td><td>5400P</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>HPE</td><td>5400P</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>HPE</td><td>5400P</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HPE</td><td>HPE ProLiant DL380 Gen10</td><td>HPE</td><td>5400P</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<!--<tr data-type="ssd" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>HUAKUN</td><td>HuaKun TG225 B1</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>-->
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM1643a</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200K</td><td>HUAWEI</td><td>ES3510S V5</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>HUAWEI</td><td>ES3510S V5</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>HUAWEI</td><td>ES3510S V5</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Micron</td><td>5300 MAX</td><td>2.50</td><td>960GB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>0.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH5885 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288X V5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH1288 V3</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Intel</td><td>S4520</td><td>2.50</td><td>480GB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei TaiShan 200</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Micron</td><td>5200</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 1288H V5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM863a</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>Samsung</td><td>PM863a</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Samsung</td><td>PM863a</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>Samsung</td><td>PM863a</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>SanDisk</td><td>SDLF1DAR</td><td>2.50</td><td>480GB</td><td>SATA</td><td>0.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288 V3</td><td>SanDisk</td><td>SDLF1DAR</td><td>2.50</td><td>480GB</td><td>SATA</td><td>0.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>SanDisk</td><td>SDLF1DAR</td><td>2.50</td><td>480GB</td><td>SATA</td><td>0.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei RH2288H V3</td><td>SanDisk</td><td>SDLF1DAR</td><td>2.50</td><td>480GB</td><td>SATA</td><td>0.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Huawei</td><td>Huawei 2288H V5</td><td>YANGTZE MEMORY</td><td>SE005</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5266M6</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8465M4</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur IR5280M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4620</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel</td><td>S4620</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5260H2</td><td>Intel</td><td>S4620</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M6</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5270M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5460M4</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5460M4</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212H5</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4520</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>2.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4520</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>2.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4520</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>2.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel</td><td>S4520</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>2.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Intel</td><td>S4520</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>2.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4520</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>2.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8260M6</td><td>Intel</td><td>S4520</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>2.60</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H2</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5280M6</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur CS5280H</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.20</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M5</td><td>Micron</td><td>5200</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Micron</td><td>5200</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M6</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5280M4</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5466M5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF8480M5</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur SA5212M4</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Inspur</td><td>Inspur NF5468M5</td><td>Samsung</td><td>PM1643a </td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Samsung</td><td>PM863</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkServer RD450</td><td>Samsung</td><td>PM863</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650 V2</td><td>Micron</td><td>5300 MAX</td><td>2.50</td><td>960GB</td><td>SATA</td><td>5.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR358FV2</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR550</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SD530</td><td>Intel</td><td>S4610</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel</td><td>S4620</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR658</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR620C</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SN550</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkServer SR660 V2</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>ThinkSystem SR650</td><td>Intel</td><td>S4500</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel</td><td>S3610</td><td>2.50</td><td>800GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Lenovo</td><td>System x3650 M5</td><td>Intel</td><td>S3610</td><td>2.50</td><td>800GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Nettrix</td><td>X620 G40</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Nettrix</td><td>R620 G40</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>PowerLeader</td><td>PR2710P</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>PowerLeader</td><td>PR223K</td><td>HUAWEI</td><td>ES3521A V6</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>PowerLeader</td><td>PR210K</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<!--<tr data-type="ssd" data-status="compatible"><td>SIXUNITED</td><td>HUAQIN XS22V2-H</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>-->
<tr data-type="ssd" data-status="compatible"><td>Sugon</td><td>H520-G30A</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Sugon</td><td>S640-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Sugon</td><td>S640-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Sugon</td><td>I420-G30</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Sugon</td><td>I840-G30</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Sugon</td><td>I620-G10</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM1643a</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM1643a</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Intel</td><td>S4610</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>3.10</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-G30</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H520-G30</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Intel</td><td>S4510</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.90</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>H620-C30</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Intel</td><td>S4520</td><td>2.50</td><td>480GB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6230HA</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5230HA</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>7.68TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R5240H0</td><td>Samsung</td><td>PM897</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.20</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>R6240H0</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>X7340H0</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.20</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Suma</td><td>X7840H0</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.20</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>SuperCloud</td><td>R5210 G11</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>SuperCloud</td><td>R5210 G11</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>SuperCloud</td><td>R8424 G11</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>SuperCloud</td><td>R5215 A12</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer F619H6-FT</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer F619H6-FT</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer 7049GP-TRT</td><td>Intel</td><td>S4620</td><td>2.50</td><td>960GB</td><td>SATA</td><td>4.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer 4048B-TR4FT </td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer F619H6-FT</td><td>Intel</td><td>S4520</td><td>2.50</td><td>480GB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR2 </td><td>Intel</td><td>S4600</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>Supermicro</td><td>SuperServer 4028GR-TR</td><td>Intel</td><td>S4600</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<!--<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Samsung</td><td>PM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Intel</td><td>S4520</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3800 G5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.20</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3830 G5</td><td>Micron</td><td>5300 PRO</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.50</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>UNISYUE TECHNOLOGIES</td><td>UNIS R3820 G3</td><td>SSSTC</td><td>ER2</td><td>2.50</td><td>240GB</td><td>SATA</td><td>1.00</td><td></td></tr>-->
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Samsung</td><td>PM1643a</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Samsung</td><td>SM883</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>HUAWEI</td><td>ES3510S V5</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>HUAWEI</td><td>ES3521A V6</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Intel</td><td>S4610</td><td>2.50</td><td>480GB</td><td>SATA</td><td>3.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel</td><td>S4510</td><td>2.50</td><td>480GB</td><td>SATA</td><td>1.30</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Intel</td><td>S4510</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>2.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>3.84TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer CX5200 V5</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>960GB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>Samsung</td><td>PM893</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>xFusion</td><td>FusionServer 2288H V6</td><td>YANGTZE MEMORY</td><td>SE005</td><td>2.50</td><td>1.92TB</td><td>SATA</td><td>1.00</td><td></td></tr>
<tr data-type="ssd" data-status="compatible"><td>ZTE</td><td>R5300 G4</td><td>Intel</td><td>S4610</td><td>2.50</td><td>960GB</td><td>SATA</td><td>3.40</td><td></td></tr>
 
                </tbody>
              </table>
            </div>
          </section>

          <!-- HDD TABLE -->
          <section ref="hddSection" class="tab-section" data-category="hdd">
            <h2 class="tab-title">HDD (<span class="cat-count">0</span> results)</h2>
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                   <th>Size</th><th>Capacity</th><th>Interface</th><th>RPM</th><th>Notes</th>
                  </tr>
                </thead>
                <tbody ref="hddBody">
                  <tr data-type="hdd" data-status="compatible"><td>2.50</td><td>1000GB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>2.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>1000GB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>2.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>4.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>6.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>8.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>10.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>12.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>14.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>16.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>18.00TB</td><td>SATA</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>300GB</td><td>SAS</td><td>10.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>600GB</td><td>SAS</td><td>10.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>900GB</td><td>SAS</td><td>10.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>1.20TB</td><td>SAS</td><td>10.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>1.80TB</td><td>SAS</td><td>10.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>2.40TB</td><td>SAS</td><td>10.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>300GB</td><td>SAS</td><td>15.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>600GB</td><td>SAS</td><td>15.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>2.50</td><td>900GB</td><td>SAS</td><td>15.00K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>1000GB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>2.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>4.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>6.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>8.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>10.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>12.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>14.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
<tr data-type="hdd" data-status="compatible"><td>3.50</td><td>16.00TB</td><td>SAS</td><td>7.20K</td><td></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- NO RESULTS -->
          <div v-show="visibleCount === 0" class="no-results">
            No matching hardware found. Try adjusting your filters.
          </div>
        </div>

        <!-- PAGINATION -->
        <div v-show="totalPages > 1" class="pagination">
          <button class="btn secondary" :disabled="currentPage === 1" @click="goPage(currentPage - 1)">← Prev</button>
          <template v-for="p in paginationRange" :key="p">
            <button v-if="p !== '...'" class="btn page-btn" :class="{ active: currentPage === p }" @click="goPage(p as number)">{{ p }}</button>
            <span v-else class="dots">…</span>
          </template>
          <button class="btn secondary" :disabled="currentPage === totalPages" @click="goPage(currentPage + 1)">Next →</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from "vue"

// ── Refs to all tbody elements ──
const cpuBody = ref<HTMLTableSectionElement | null>(null)
const storageBody = ref<HTMLTableSectionElement | null>(null)
const gpuBody = ref<HTMLTableSectionElement | null>(null)
const nicBody = ref<HTMLTableSectionElement | null>(null)
const ssdBody = ref<HTMLTableSectionElement | null>(null)
const hddBody = ref<HTMLTableSectionElement | null>(null)

const cpuSection = ref<HTMLElement | null>(null)
const storageSection = ref<HTMLElement | null>(null)
const gpuSection = ref<HTMLElement | null>(null)
const nicSection = ref<HTMLElement | null>(null)
const ssdSection = ref<HTMLElement | null>(null)
const hddSection = ref<HTMLElement | null>(null)

// ── State ──
const selectedCategory = ref("all")
const selectedManufacturer = ref("all")
const searchQuery = ref("")
const currentPage = ref(1)
const perPage = 50
const sortField = ref("")
const sortOrder = ref<"asc" | "desc">("asc")
const visibleCount = ref(0)
const totalCount = ref(0)
const manufacturers = ref<string[]>([])

// ── All parsed rows stored here ──
interface RowData {
  tr: HTMLTableRowElement
  type: string
  manufacturer: string
  text: string
  cells: string[]
}

let allRows: RowData[] = []
let filteredRowsCache: RowData[] = []

// ── Get all tbody refs ──
function getAllBodies(): { type: string; body: HTMLTableSectionElement; section: HTMLElement }[] {
  const list: { type: string; body: HTMLTableSectionElement; section: HTMLElement }[] = []
  if (cpuBody.value && cpuSection.value) list.push({ type: "cpu", body: cpuBody.value, section: cpuSection.value })
  if (storageBody.value && storageSection.value) list.push({ type: "storage", body: storageBody.value, section: storageSection.value })
  if (gpuBody.value && gpuSection.value) list.push({ type: "gpu", body: gpuBody.value, section: gpuSection.value })
  if (nicBody.value && nicSection.value) list.push({ type: "nic", body: nicBody.value, section: nicSection.value })
  if (ssdBody.value && ssdSection.value) list.push({ type: "ssd", body: ssdBody.value, section: ssdSection.value })
  if (hddBody.value && hddSection.value) list.push({ type: "hdd", body: hddBody.value, section: hddSection.value })
  return list
}

// ── Parse all rows on mount ──
onMounted(() => {
  const bodies = getAllBodies()
  allRows = []

  bodies.forEach(({ body }) => {
    const rows = body.querySelectorAll("tr[data-type]")
    rows.forEach((tr) => {
      const el = tr as HTMLTableRowElement
      const cells = Array.from(el.cells).map((td) => td.textContent?.trim() || "")
      allRows.push({
        tr: el,
        type: el.dataset.type || "",
        manufacturer: cells[0] || "",
        text: cells.join(" ").toLowerCase(),
        cells,
      })
    })
  })

  totalCount.value = allRows.length
  applyFilters()
})

// ── Filter + paginate ──
function applyFilters() {
  const cat = selectedCategory.value
  const mfr = selectedManufacturer.value.toLowerCase()
  const q = searchQuery.value.trim().toLowerCase()

  // Filter
  filteredRowsCache = allRows.filter((row) => {
    if (cat !== "all" && row.type !== cat) return false
    if (mfr !== "all" && row.manufacturer.toLowerCase() !== mfr) return false
    if (q && !row.text.includes(q)) return false
    return true
  })

  // Sort
  if (sortField.value) {
    const idx = parseInt(sortField.value)
    filteredRowsCache.sort((a, b) => {
      const va = (a.cells[idx] || "").toLowerCase()
      const vb = (b.cells[idx] || "").toLowerCase()
      const cmp = va.localeCompare(vb, undefined, { numeric: true })
      return sortOrder.value === "asc" ? cmp : -cmp
    })
  }

  visibleCount.value = filteredRowsCache.length

  // Update manufacturers list
  const relevantRows = cat === "all" ? allRows : allRows.filter((r) => r.type === cat)
  manufacturers.value = [...new Set(relevantRows.map((r) => r.manufacturer))].sort()

  // Apply pagination
  applyPagination()
}

function applyPagination() {
  const bodies = getAllBodies()
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage

  // First hide ALL rows
  allRows.forEach((row) => {
    row.tr.style.display = "none"
  })

  // Show only paginated filtered rows
  const pageRows = filteredRowsCache.slice(start, end)
  pageRows.forEach((row) => {
    row.tr.style.display = ""
  })

  // Show/hide sections based on category + whether they have visible rows
  const cat = selectedCategory.value
  const typesInPage = new Set(pageRows.map((r) => r.type))
  const typesInFiltered = new Set(filteredRowsCache.map((r) => r.type))

  bodies.forEach(({ type, section }) => {
    const showSection = (cat === "all" || cat === type) && typesInFiltered.has(type)
    section.style.display = showSection ? "block" : "none"

    // Update count in section title
    const countEl = section.querySelector(".cat-count")
    if (countEl) {
      countEl.textContent = String(filteredRowsCache.filter((r) => r.type === type).length)
    }
  })
}

// ── Event handlers ──
function onFilterChange() {
  currentPage.value = 1
  selectedManufacturer.value = "all"
  nextTick(() => applyFilters())
}

// Override the watcher-style approach with explicit calls
function toggleMfr(mfr: string) {
  selectedManufacturer.value = selectedManufacturer.value === mfr ? "all" : mfr
  currentPage.value = 1
  applyFilters()
}

function goPage(p: number) {
  currentPage.value = p
  applyPagination()
}

// ── Sorting ──
function sortBy(field: string) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
  } else {
    sortField.value = field
    sortOrder.value = "asc"
  }
  currentPage.value = 1
  applyFilters()
}

function getSortIcon(field: string): string {
  if (sortField.value !== field) return "↕"
  return sortOrder.value === "asc" ? "↑" : "↓"
}

// ── Pagination range ──
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRowsCache.length / perPage)))

const paginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const range: (number | string)[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) range.push(i)
  } else {
    range.push(1)
    if (current > 3) range.push("...")
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) range.push(i)
    if (current < total - 2) range.push("...")
    range.push(total)
  }
  return range
})

// ── Export CSV ──
function exportCSV() {
  const csvRows = ["Type,Manufacturer,Model,Col3,Col4,Col5,Col6,Col7,Col8,Col9"]

  filteredRowsCache.forEach((row) => {
    const escaped = row.cells.map((c) => `"${c.replace(/"/g, '""')}"`)
    csvRows.push(`"${row.type}",${escaped.join(",")}`)
  })

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "nexavm-compatibility.csv"
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style lang="postcss" scoped>
* { box-sizing: border-box; }

.page {
  max-width: 1280px;
  margin: 24px auto;
  padding: 0 16px;
}

.shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
}

.panel {
  background: #e5e5e5;
  border-radius: 16px;
}

.sidebar {
  padding: 16px;
  position: sticky;
  top: 16px;
  align-self: start;
  max-height: calc(100vh - 32px);
  overflow: auto;
}

.main { padding: 16px 16px 8px; }

header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

input[type="search"] {
  padding: 10px 12px;
  font-size: 0.95rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  color: #111827;
  min-width: 250px;
}

.btn {
  background: #27bdc3;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.2s;
}

.btn:hover { background: #ff5800; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

.btn.secondary {
  background: transparent;
  color: #27bdc3;
  border: 1px solid #27bdc3;
}

.btn.secondary:hover { background: #27bdc3; color: #fff; }

.btn.page-btn {
  min-width: 38px;
  padding: 6px 10px;
  font-size: 0.85rem;
}

.btn.page-btn.active { background: #ff5800; }

.section-title {
  font-weight: 800;
  margin: 8px 0 6px;
  font-size: 0.95rem;
}

.select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font-size: 0.95rem;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0 4px;
}

.chip {
  background: #ddd;
  color: #666;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  border: 1px solid transparent;
}

.chip.active { background: #27bdc3; color: #fff; }

.mfr-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-top: 6px;
}

.mfr {
  background: #fff;
  color: #111827;
  border: 1px solid #111827;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}

.mfr.active { background: #27bdc3; color: white; border-color: #27bdc3; }
.mfr:hover { border-color: #27bdc3; }

.stats { margin-top: 16px; }

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 0.9rem;
}

.table-wrap {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.table-scroll { overflow-x: auto; }

/* Sections visible by default, JS hides them */
.tab-section {
  display: block;
  padding: 10px;
}

.tab-section + .tab-section { border-top: 2px solid #e5e5e5; }

h2.tab-title {
  margin: 10px 0 6px;
  font-size: 1rem;
  font-weight: 700;
}

table { border-collapse: collapse; width: 100%; }

th, td {
  padding: 8px 12px;
  border: 1px solid #ccc;
  font-size: 0.92rem;
}

th {
  background: #d8d8d8;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
  white-space: nowrap;
}

th.sortable { cursor: pointer; user-select: none; }
th.sortable:hover { background: #c8c8c8; }

.sort-icon { font-size: 0.75rem; margin-left: 4px; opacity: 0.6; }

tbody tr:hover { background: #f5f5f5; }

.no-results {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 1.1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 16px 0 8px;
  flex-wrap: wrap;
}

.dots { padding: 0 6px; color: #999; }

@media (max-width: 980px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar { position: static; max-height: none; }
}

@media (max-width: 560px) {
  .mfr-list { grid-template-columns: 1fr; }
  input[type="search"] { flex: 1 1 auto; min-width: 200px; }
}
</style>