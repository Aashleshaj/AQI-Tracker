/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1453.0, "series": [{"data": [[0.0, 1.0], [0.1, 1.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 1.0], [0.6, 1.0], [0.7, 1.0], [0.8, 1.0], [0.9, 1.0], [1.0, 1.0], [1.1, 1.0], [1.2, 1.0], [1.3, 2.0], [1.4, 2.0], [1.5, 2.0], [1.6, 2.0], [1.7, 2.0], [1.8, 3.0], [1.9, 3.0], [2.0, 3.0], [2.1, 563.0], [2.2, 563.0], [2.3, 576.0], [2.4, 576.0], [2.5, 576.0], [2.6, 588.0], [2.7, 588.0], [2.8, 616.0], [2.9, 616.0], [3.0, 616.0], [3.1, 626.0], [3.2, 626.0], [3.3, 644.0], [3.4, 644.0], [3.5, 644.0], [3.6, 704.0], [3.7, 704.0], [3.8, 713.0], [3.9, 713.0], [4.0, 713.0], [4.1, 720.0], [4.2, 720.0], [4.3, 1028.0], [4.4, 1028.0], [4.5, 1028.0], [4.6, 1029.0], [4.7, 1029.0], [4.8, 1031.0], [4.9, 1031.0], [5.0, 1031.0], [5.1, 1031.0], [5.2, 1031.0], [5.3, 1031.0], [5.4, 1031.0], [5.5, 1031.0], [5.6, 1032.0], [5.7, 1032.0], [5.8, 1032.0], [5.9, 1032.0], [6.0, 1032.0], [6.1, 1034.0], [6.2, 1034.0], [6.3, 1035.0], [6.4, 1035.0], [6.5, 1035.0], [6.6, 1035.0], [6.7, 1035.0], [6.8, 1035.0], [6.9, 1035.0], [7.0, 1035.0], [7.1, 1036.0], [7.2, 1036.0], [7.3, 1036.0], [7.4, 1036.0], [7.5, 1036.0], [7.6, 1037.0], [7.7, 1037.0], [7.8, 1037.0], [7.9, 1037.0], [8.0, 1037.0], [8.1, 1037.0], [8.2, 1037.0], [8.3, 1038.0], [8.4, 1038.0], [8.5, 1038.0], [8.6, 1038.0], [8.7, 1038.0], [8.8, 1039.0], [8.9, 1039.0], [9.0, 1039.0], [9.1, 1039.0], [9.2, 1039.0], [9.3, 1040.0], [9.4, 1040.0], [9.5, 1040.0], [9.6, 1040.0], [9.7, 1040.0], [9.8, 1040.0], [9.9, 1040.0], [10.0, 1040.0], [10.1, 1041.0], [10.2, 1041.0], [10.3, 1042.0], [10.4, 1042.0], [10.5, 1042.0], [10.6, 1042.0], [10.7, 1042.0], [10.8, 1043.0], [10.9, 1043.0], [11.0, 1043.0], [11.1, 1043.0], [11.2, 1043.0], [11.3, 1043.0], [11.4, 1043.0], [11.5, 1043.0], [11.6, 1043.0], [11.7, 1043.0], [11.8, 1043.0], [11.9, 1043.0], [12.0, 1043.0], [12.1, 1044.0], [12.2, 1044.0], [12.3, 1044.0], [12.4, 1044.0], [12.5, 1044.0], [12.6, 1044.0], [12.7, 1044.0], [12.8, 1045.0], [12.9, 1045.0], [13.0, 1045.0], [13.1, 1045.0], [13.2, 1045.0], [13.3, 1045.0], [13.4, 1045.0], [13.5, 1045.0], [13.6, 1045.0], [13.7, 1045.0], [13.8, 1046.0], [13.9, 1046.0], [14.0, 1046.0], [14.1, 1046.0], [14.2, 1046.0], [14.3, 1046.0], [14.4, 1046.0], [14.5, 1046.0], [14.6, 1047.0], [14.7, 1047.0], [14.8, 1047.0], [14.9, 1047.0], [15.0, 1047.0], [15.1, 1047.0], [15.2, 1047.0], [15.3, 1048.0], [15.4, 1048.0], [15.5, 1048.0], [15.6, 1048.0], [15.7, 1048.0], [15.8, 1049.0], [15.9, 1049.0], [16.0, 1049.0], [16.1, 1049.0], [16.2, 1049.0], [16.3, 1049.0], [16.4, 1049.0], [16.5, 1049.0], [16.6, 1050.0], [16.7, 1050.0], [16.8, 1050.0], [16.9, 1050.0], [17.0, 1050.0], [17.1, 1050.0], [17.2, 1050.0], [17.3, 1050.0], [17.4, 1050.0], [17.5, 1050.0], [17.6, 1050.0], [17.7, 1050.0], [17.8, 1051.0], [17.9, 1051.0], [18.0, 1051.0], [18.1, 1051.0], [18.2, 1051.0], [18.3, 1051.0], [18.4, 1051.0], [18.5, 1051.0], [18.6, 1051.0], [18.7, 1051.0], [18.8, 1051.0], [18.9, 1051.0], [19.0, 1051.0], [19.1, 1051.0], [19.2, 1051.0], [19.3, 1051.0], [19.4, 1051.0], [19.5, 1051.0], [19.6, 1052.0], [19.7, 1052.0], [19.8, 1052.0], [19.9, 1052.0], [20.0, 1052.0], [20.1, 1053.0], [20.2, 1053.0], [20.3, 1053.0], [20.4, 1053.0], [20.5, 1053.0], [20.6, 1054.0], [20.7, 1054.0], [20.8, 1054.0], [20.9, 1054.0], [21.0, 1054.0], [21.1, 1054.0], [21.2, 1054.0], [21.3, 1054.0], [21.4, 1054.0], [21.5, 1054.0], [21.6, 1054.0], [21.7, 1054.0], [21.8, 1054.0], [21.9, 1055.0], [22.0, 1055.0], [22.1, 1055.0], [22.2, 1055.0], [22.3, 1055.0], [22.4, 1055.0], [22.5, 1055.0], [22.6, 1055.0], [22.7, 1055.0], [22.8, 1055.0], [22.9, 1055.0], [23.0, 1055.0], [23.1, 1055.0], [23.2, 1055.0], [23.3, 1055.0], [23.4, 1056.0], [23.5, 1056.0], [23.6, 1056.0], [23.7, 1056.0], [23.8, 1056.0], [23.9, 1056.0], [24.0, 1056.0], [24.1, 1056.0], [24.2, 1056.0], [24.3, 1056.0], [24.4, 1057.0], [24.5, 1057.0], [24.6, 1057.0], [24.7, 1057.0], [24.8, 1057.0], [24.9, 1058.0], [25.0, 1058.0], [25.1, 1058.0], [25.2, 1058.0], [25.3, 1058.0], [25.4, 1059.0], [25.5, 1059.0], [25.6, 1060.0], [25.7, 1060.0], [25.8, 1060.0], [25.9, 1060.0], [26.0, 1060.0], [26.1, 1060.0], [26.2, 1060.0], [26.3, 1060.0], [26.4, 1061.0], [26.5, 1061.0], [26.6, 1061.0], [26.7, 1061.0], [26.8, 1061.0], [26.9, 1061.0], [27.0, 1061.0], [27.1, 1061.0], [27.2, 1061.0], [27.3, 1061.0], [27.4, 1062.0], [27.5, 1062.0], [27.6, 1062.0], [27.7, 1062.0], [27.8, 1062.0], [27.9, 1062.0], [28.0, 1062.0], [28.1, 1062.0], [28.2, 1062.0], [28.3, 1062.0], [28.4, 1062.0], [28.5, 1062.0], [28.6, 1062.0], [28.7, 1062.0], [28.8, 1062.0], [28.9, 1062.0], [29.0, 1062.0], [29.1, 1063.0], [29.2, 1063.0], [29.3, 1063.0], [29.4, 1063.0], [29.5, 1063.0], [29.6, 1064.0], [29.7, 1064.0], [29.8, 1064.0], [29.9, 1064.0], [30.0, 1064.0], [30.1, 1064.0], [30.2, 1064.0], [30.3, 1064.0], [30.4, 1064.0], [30.5, 1064.0], [30.6, 1065.0], [30.7, 1065.0], [30.8, 1065.0], [30.9, 1065.0], [31.0, 1065.0], [31.1, 1066.0], [31.2, 1066.0], [31.3, 1066.0], [31.4, 1066.0], [31.5, 1066.0], [31.6, 1066.0], [31.7, 1066.0], [31.8, 1066.0], [31.9, 1066.0], [32.0, 1066.0], [32.1, 1066.0], [32.2, 1066.0], [32.3, 1066.0], [32.4, 1066.0], [32.5, 1066.0], [32.6, 1068.0], [32.7, 1068.0], [32.8, 1068.0], [32.9, 1068.0], [33.0, 1068.0], [33.1, 1068.0], [33.2, 1068.0], [33.3, 1068.0], [33.4, 1069.0], [33.5, 1069.0], [33.6, 1070.0], [33.7, 1070.0], [33.8, 1070.0], [33.9, 1070.0], [34.0, 1070.0], [34.1, 1071.0], [34.2, 1071.0], [34.3, 1071.0], [34.4, 1072.0], [34.5, 1072.0], [34.6, 1073.0], [34.7, 1073.0], [34.8, 1073.0], [34.9, 1073.0], [35.0, 1073.0], [35.1, 1073.0], [35.2, 1073.0], [35.3, 1073.0], [35.4, 1073.0], [35.5, 1073.0], [35.6, 1075.0], [35.7, 1075.0], [35.8, 1075.0], [35.9, 1075.0], [36.0, 1075.0], [36.1, 1076.0], [36.2, 1076.0], [36.3, 1076.0], [36.4, 1077.0], [36.5, 1077.0], [36.6, 1077.0], [36.7, 1077.0], [36.8, 1077.0], [36.9, 1078.0], [37.0, 1078.0], [37.1, 1078.0], [37.2, 1078.0], [37.3, 1078.0], [37.4, 1078.0], [37.5, 1078.0], [37.6, 1079.0], [37.7, 1079.0], [37.8, 1079.0], [37.9, 1079.0], [38.0, 1079.0], [38.1, 1079.0], [38.2, 1079.0], [38.3, 1079.0], [38.4, 1079.0], [38.5, 1079.0], [38.6, 1079.0], [38.7, 1079.0], [38.8, 1079.0], [38.9, 1080.0], [39.0, 1080.0], [39.1, 1081.0], [39.2, 1081.0], [39.3, 1081.0], [39.4, 1081.0], [39.5, 1081.0], [39.6, 1081.0], [39.7, 1081.0], [39.8, 1081.0], [39.9, 1081.0], [40.0, 1081.0], [40.1, 1081.0], [40.2, 1082.0], [40.3, 1082.0], [40.4, 1082.0], [40.5, 1082.0], [40.6, 1082.0], [40.7, 1082.0], [40.8, 1082.0], [40.9, 1083.0], [41.0, 1083.0], [41.1, 1083.0], [41.2, 1084.0], [41.3, 1084.0], [41.4, 1084.0], [41.5, 1084.0], [41.6, 1084.0], [41.7, 1084.0], [41.8, 1084.0], [41.9, 1085.0], [42.0, 1085.0], [42.1, 1085.0], [42.2, 1086.0], [42.3, 1086.0], [42.4, 1086.0], [42.5, 1086.0], [42.6, 1086.0], [42.7, 1086.0], [42.8, 1086.0], [42.9, 1088.0], [43.0, 1088.0], [43.1, 1088.0], [43.2, 1088.0], [43.3, 1088.0], [43.4, 1089.0], [43.5, 1089.0], [43.6, 1089.0], [43.7, 1089.0], [43.8, 1089.0], [43.9, 1089.0], [44.0, 1089.0], [44.1, 1089.0], [44.2, 1089.0], [44.3, 1089.0], [44.4, 1090.0], [44.5, 1090.0], [44.6, 1090.0], [44.7, 1091.0], [44.8, 1091.0], [44.9, 1091.0], [45.0, 1091.0], [45.1, 1091.0], [45.2, 1092.0], [45.3, 1092.0], [45.4, 1093.0], [45.5, 1093.0], [45.6, 1093.0], [45.7, 1093.0], [45.8, 1093.0], [45.9, 1093.0], [46.0, 1093.0], [46.1, 1093.0], [46.2, 1093.0], [46.3, 1093.0], [46.4, 1093.0], [46.5, 1093.0], [46.6, 1093.0], [46.7, 1094.0], [46.8, 1094.0], [46.9, 1094.0], [47.0, 1094.0], [47.1, 1094.0], [47.2, 1095.0], [47.3, 1095.0], [47.4, 1096.0], [47.5, 1096.0], [47.6, 1096.0], [47.7, 1096.0], [47.8, 1096.0], [47.9, 1096.0], [48.0, 1096.0], [48.1, 1096.0], [48.2, 1096.0], [48.3, 1096.0], [48.4, 1097.0], [48.5, 1097.0], [48.6, 1097.0], [48.7, 1098.0], [48.8, 1098.0], [48.9, 1098.0], [49.0, 1098.0], [49.1, 1098.0], [49.2, 1098.0], [49.3, 1098.0], [49.4, 1098.0], [49.5, 1098.0], [49.6, 1098.0], [49.7, 1099.0], [49.8, 1099.0], [49.9, 1099.0], [50.0, 1099.0], [50.1, 1099.0], [50.2, 1099.0], [50.3, 1099.0], [50.4, 1099.0], [50.5, 1099.0], [50.6, 1099.0], [50.7, 1100.0], [50.8, 1100.0], [50.9, 1100.0], [51.0, 1100.0], [51.1, 1100.0], [51.2, 1100.0], [51.3, 1100.0], [51.4, 1100.0], [51.5, 1100.0], [51.6, 1100.0], [51.7, 1100.0], [51.8, 1100.0], [51.9, 1100.0], [52.0, 1100.0], [52.1, 1100.0], [52.2, 1101.0], [52.3, 1101.0], [52.4, 1101.0], [52.5, 1101.0], [52.6, 1101.0], [52.7, 1102.0], [52.8, 1102.0], [52.9, 1102.0], [53.0, 1102.0], [53.1, 1102.0], [53.2, 1104.0], [53.3, 1104.0], [53.4, 1104.0], [53.5, 1104.0], [53.6, 1104.0], [53.7, 1104.0], [53.8, 1104.0], [53.9, 1105.0], [54.0, 1105.0], [54.1, 1105.0], [54.2, 1106.0], [54.3, 1106.0], [54.4, 1106.0], [54.5, 1106.0], [54.6, 1106.0], [54.7, 1106.0], [54.8, 1106.0], [54.9, 1107.0], [55.0, 1107.0], [55.1, 1107.0], [55.2, 1108.0], [55.3, 1108.0], [55.4, 1108.0], [55.5, 1108.0], [55.6, 1108.0], [55.7, 1108.0], [55.8, 1108.0], [55.9, 1108.0], [56.0, 1108.0], [56.1, 1108.0], [56.2, 1110.0], [56.3, 1110.0], [56.4, 1110.0], [56.5, 1110.0], [56.6, 1110.0], [56.7, 1111.0], [56.8, 1111.0], [56.9, 1111.0], [57.0, 1111.0], [57.1, 1111.0], [57.2, 1112.0], [57.3, 1112.0], [57.4, 1112.0], [57.5, 1112.0], [57.6, 1112.0], [57.7, 1112.0], [57.8, 1112.0], [57.9, 1112.0], [58.0, 1112.0], [58.1, 1112.0], [58.2, 1112.0], [58.3, 1112.0], [58.4, 1113.0], [58.5, 1113.0], [58.6, 1113.0], [58.7, 1113.0], [58.8, 1113.0], [58.9, 1114.0], [59.0, 1114.0], [59.1, 1114.0], [59.2, 1114.0], [59.3, 1114.0], [59.4, 1115.0], [59.5, 1115.0], [59.6, 1115.0], [59.7, 1115.0], [59.8, 1115.0], [59.9, 1115.0], [60.0, 1115.0], [60.1, 1115.0], [60.2, 1116.0], [60.3, 1116.0], [60.4, 1116.0], [60.5, 1116.0], [60.6, 1116.0], [60.7, 1117.0], [60.8, 1117.0], [60.9, 1117.0], [61.0, 1117.0], [61.1, 1117.0], [61.2, 1117.0], [61.3, 1117.0], [61.4, 1117.0], [61.5, 1118.0], [61.6, 1118.0], [61.7, 1118.0], [61.8, 1118.0], [61.9, 1118.0], [62.0, 1118.0], [62.1, 1118.0], [62.2, 1118.0], [62.3, 1118.0], [62.4, 1118.0], [62.5, 1119.0], [62.6, 1119.0], [62.7, 1119.0], [62.8, 1119.0], [62.9, 1119.0], [63.0, 1119.0], [63.1, 1119.0], [63.2, 1120.0], [63.3, 1120.0], [63.4, 1120.0], [63.5, 1120.0], [63.6, 1120.0], [63.7, 1120.0], [63.8, 1120.0], [63.9, 1120.0], [64.0, 1120.0], [64.1, 1120.0], [64.2, 1121.0], [64.3, 1121.0], [64.4, 1121.0], [64.5, 1121.0], [64.6, 1121.0], [64.7, 1122.0], [64.8, 1122.0], [64.9, 1122.0], [65.0, 1122.0], [65.1, 1122.0], [65.2, 1122.0], [65.3, 1122.0], [65.4, 1122.0], [65.5, 1123.0], [65.6, 1123.0], [65.7, 1123.0], [65.8, 1123.0], [65.9, 1123.0], [66.0, 1123.0], [66.1, 1123.0], [66.2, 1123.0], [66.3, 1123.0], [66.4, 1123.0], [66.5, 1123.0], [66.6, 1123.0], [66.7, 1124.0], [66.8, 1124.0], [66.9, 1124.0], [67.0, 1124.0], [67.1, 1124.0], [67.2, 1124.0], [67.3, 1124.0], [67.4, 1124.0], [67.5, 1126.0], [67.6, 1126.0], [67.7, 1126.0], [67.8, 1126.0], [67.9, 1126.0], [68.0, 1126.0], [68.1, 1126.0], [68.2, 1127.0], [68.3, 1127.0], [68.4, 1127.0], [68.5, 1128.0], [68.6, 1128.0], [68.7, 1129.0], [68.8, 1129.0], [68.9, 1129.0], [69.0, 1129.0], [69.1, 1129.0], [69.2, 1129.0], [69.3, 1129.0], [69.4, 1129.0], [69.5, 1130.0], [69.6, 1130.0], [69.7, 1132.0], [69.8, 1132.0], [69.9, 1132.0], [70.0, 1132.0], [70.1, 1132.0], [70.2, 1132.0], [70.3, 1132.0], [70.4, 1132.0], [70.5, 1133.0], [70.6, 1133.0], [70.7, 1133.0], [70.8, 1133.0], [70.9, 1133.0], [71.0, 1133.0], [71.1, 1133.0], [71.2, 1134.0], [71.3, 1134.0], [71.4, 1134.0], [71.5, 1135.0], [71.6, 1135.0], [71.7, 1135.0], [71.8, 1135.0], [71.9, 1135.0], [72.0, 1135.0], [72.1, 1135.0], [72.2, 1135.0], [72.3, 1135.0], [72.4, 1135.0], [72.5, 1135.0], [72.6, 1135.0], [72.7, 1136.0], [72.8, 1136.0], [72.9, 1136.0], [73.0, 1137.0], [73.1, 1137.0], [73.2, 1138.0], [73.3, 1138.0], [73.4, 1138.0], [73.5, 1138.0], [73.6, 1138.0], [73.7, 1138.0], [73.8, 1138.0], [73.9, 1138.0], [74.0, 1138.0], [74.1, 1138.0], [74.2, 1139.0], [74.3, 1139.0], [74.4, 1139.0], [74.5, 1139.0], [74.6, 1139.0], [74.7, 1139.0], [74.8, 1139.0], [74.9, 1139.0], [75.0, 1140.0], [75.1, 1140.0], [75.2, 1140.0], [75.3, 1140.0], [75.4, 1140.0], [75.5, 1140.0], [75.6, 1140.0], [75.7, 1141.0], [75.8, 1141.0], [75.9, 1141.0], [76.0, 1141.0], [76.1, 1141.0], [76.2, 1142.0], [76.3, 1142.0], [76.4, 1142.0], [76.5, 1142.0], [76.6, 1142.0], [76.7, 1143.0], [76.8, 1143.0], [76.9, 1143.0], [77.0, 1144.0], [77.1, 1144.0], [77.2, 1144.0], [77.3, 1144.0], [77.4, 1144.0], [77.5, 1145.0], [77.6, 1145.0], [77.7, 1145.0], [77.8, 1145.0], [77.9, 1145.0], [78.0, 1145.0], [78.1, 1145.0], [78.2, 1146.0], [78.3, 1146.0], [78.4, 1146.0], [78.5, 1146.0], [78.6, 1146.0], [78.7, 1147.0], [78.8, 1147.0], [78.9, 1147.0], [79.0, 1148.0], [79.1, 1148.0], [79.2, 1148.0], [79.3, 1148.0], [79.4, 1148.0], [79.5, 1150.0], [79.6, 1150.0], [79.7, 1152.0], [79.8, 1152.0], [79.9, 1152.0], [80.0, 1152.0], [80.1, 1152.0], [80.2, 1152.0], [80.3, 1152.0], [80.4, 1152.0], [80.5, 1152.0], [80.6, 1152.0], [80.7, 1152.0], [80.8, 1153.0], [80.9, 1153.0], [81.0, 1153.0], [81.1, 1153.0], [81.2, 1153.0], [81.3, 1154.0], [81.4, 1154.0], [81.5, 1155.0], [81.6, 1155.0], [81.7, 1155.0], [81.8, 1155.0], [81.9, 1155.0], [82.0, 1155.0], [82.1, 1155.0], [82.2, 1155.0], [82.3, 1156.0], [82.4, 1156.0], [82.5, 1157.0], [82.6, 1157.0], [82.7, 1157.0], [82.8, 1157.0], [82.9, 1157.0], [83.0, 1157.0], [83.1, 1157.0], [83.2, 1157.0], [83.3, 1158.0], [83.4, 1158.0], [83.5, 1159.0], [83.6, 1159.0], [83.7, 1159.0], [83.8, 1160.0], [83.9, 1160.0], [84.0, 1162.0], [84.1, 1162.0], [84.2, 1162.0], [84.3, 1166.0], [84.4, 1166.0], [84.5, 1166.0], [84.6, 1166.0], [84.7, 1166.0], [84.8, 1167.0], [84.9, 1167.0], [85.0, 1169.0], [85.1, 1169.0], [85.2, 1169.0], [85.3, 1169.0], [85.4, 1169.0], [85.5, 1169.0], [85.6, 1169.0], [85.7, 1169.0], [85.8, 1170.0], [85.9, 1170.0], [86.0, 1171.0], [86.1, 1171.0], [86.2, 1171.0], [86.3, 1172.0], [86.4, 1172.0], [86.5, 1174.0], [86.6, 1174.0], [86.7, 1174.0], [86.8, 1175.0], [86.9, 1175.0], [87.0, 1180.0], [87.1, 1180.0], [87.2, 1180.0], [87.3, 1181.0], [87.4, 1181.0], [87.5, 1181.0], [87.6, 1181.0], [87.7, 1181.0], [87.8, 1182.0], [87.9, 1182.0], [88.0, 1183.0], [88.1, 1183.0], [88.2, 1183.0], [88.3, 1184.0], [88.4, 1184.0], [88.5, 1186.0], [88.6, 1186.0], [88.7, 1186.0], [88.8, 1187.0], [88.9, 1187.0], [89.0, 1189.0], [89.1, 1189.0], [89.2, 1189.0], [89.3, 1191.0], [89.4, 1191.0], [89.5, 1196.0], [89.6, 1196.0], [89.7, 1196.0], [89.8, 1200.0], [89.9, 1200.0], [90.0, 1203.0], [90.1, 1203.0], [90.2, 1203.0], [90.3, 1205.0], [90.4, 1205.0], [90.5, 1205.0], [90.6, 1205.0], [90.7, 1205.0], [90.8, 1207.0], [90.9, 1207.0], [91.0, 1209.0], [91.1, 1209.0], [91.2, 1209.0], [91.3, 1210.0], [91.4, 1210.0], [91.5, 1213.0], [91.6, 1213.0], [91.7, 1213.0], [91.8, 1215.0], [91.9, 1215.0], [92.0, 1217.0], [92.1, 1217.0], [92.2, 1217.0], [92.3, 1217.0], [92.4, 1217.0], [92.5, 1219.0], [92.6, 1219.0], [92.7, 1219.0], [92.8, 1221.0], [92.9, 1221.0], [93.0, 1222.0], [93.1, 1222.0], [93.2, 1222.0], [93.3, 1228.0], [93.4, 1228.0], [93.5, 1242.0], [93.6, 1242.0], [93.7, 1242.0], [93.8, 1246.0], [93.9, 1246.0], [94.0, 1255.0], [94.1, 1255.0], [94.2, 1255.0], [94.3, 1258.0], [94.4, 1258.0], [94.5, 1258.0], [94.6, 1258.0], [94.7, 1258.0], [94.8, 1269.0], [94.9, 1269.0], [95.0, 1269.0], [95.1, 1269.0], [95.2, 1269.0], [95.3, 1269.0], [95.4, 1269.0], [95.5, 1297.0], [95.6, 1297.0], [95.7, 1297.0], [95.8, 1314.0], [95.9, 1314.0], [96.0, 1320.0], [96.1, 1320.0], [96.2, 1320.0], [96.3, 1324.0], [96.4, 1324.0], [96.5, 1327.0], [96.6, 1327.0], [96.7, 1327.0], [96.8, 1327.0], [96.9, 1327.0], [97.0, 1334.0], [97.1, 1334.0], [97.2, 1334.0], [97.3, 1342.0], [97.4, 1342.0], [97.5, 1348.0], [97.6, 1348.0], [97.7, 1348.0], [97.8, 1369.0], [97.9, 1369.0], [98.0, 1379.0], [98.1, 1379.0], [98.2, 1379.0], [98.3, 1392.0], [98.4, 1392.0], [98.5, 1408.0], [98.6, 1408.0], [98.7, 1408.0], [98.8, 1423.0], [98.9, 1423.0], [99.0, 1440.0], [99.1, 1440.0], [99.2, 1440.0], [99.3, 1443.0], [99.4, 1443.0], [99.5, 1448.0], [99.6, 1448.0], [99.7, 1448.0], [99.8, 1453.0], [99.9, 1453.0], [100.0, 1453.0]], "isOverall": false, "label": "GET /aqi/{city}", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "maxY": 185.0, "series": [{"data": [[0.0, 8.0], [1100.0, 156.0], [1200.0, 24.0], [600.0, 3.0], [1300.0, 11.0], [700.0, 3.0], [1400.0, 6.0], [1000.0, 185.0], [500.0, 3.0]], "isOverall": false, "label": "GET /aqi/{city}", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 399.0, "minX": 3.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 399.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 399.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 6.0, "minX": 1.78933164E12, "maxY": 15.302631578947368, "series": [{"data": [[1.78933164E12, 6.0], [1.7893317E12, 15.302631578947368]], "isOverall": false, "label": "AQI_API_Load", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7893317E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 927.3000000000001, "minX": 1.0, "maxY": 1243.6666666666667, "series": [{"data": [[8.0, 990.6521739130434], [2.0, 1194.5], [9.0, 927.3000000000001], [10.0, 1078.5333333333333], [11.0, 1121.625], [3.0, 1243.6666666666667], [12.0, 1093.0], [13.0, 1111.5], [14.0, 1114.9999999999995], [15.0, 1122.1785714285713], [4.0, 1013.3333333333333], [16.0, 1026.0], [1.0, 1123.0], [17.0, 1094.8461538461536], [18.0, 1109.4117647058827], [19.0, 1054.3888888888887], [5.0, 1147.2], [20.0, 1094.8582089552242], [6.0, 1103.3846153846157], [7.0, 1067.1818181818182]], "isOverall": false, "label": "GET /aqi/{city}", "isController": false}, {"data": [[14.85964912280701, 1083.9423558897229]], "isOverall": false, "label": "GET /aqi/{city}-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 38.36666666666667, "minX": 1.78933164E12, "maxY": 12010.783333333333, "series": [{"data": [[1.78933164E12, 598.8333333333334], [1.7893317E12, 12010.783333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78933164E12, 38.36666666666667], [1.7893317E12, 793.9333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7893317E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1046.6315789473683, "minX": 1.78933164E12, "maxY": 1085.807894736842, "series": [{"data": [[1.78933164E12, 1046.6315789473683], [1.7893317E12, 1085.807894736842]], "isOverall": false, "label": "GET /aqi/{city}", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7893317E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 1046.421052631579, "minX": 1.78933164E12, "maxY": 1085.7210526315782, "series": [{"data": [[1.78933164E12, 1046.421052631579], [1.7893317E12, 1085.7210526315782]], "isOverall": false, "label": "GET /aqi/{city}", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7893317E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.21842105263157863, "minX": 1.78933164E12, "maxY": 1.1578947368421055, "series": [{"data": [[1.78933164E12, 1.1578947368421055], [1.7893317E12, 0.21842105263157863]], "isOverall": false, "label": "GET /aqi/{city}", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7893317E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1.7976931348623157E308, "minX": 1.7976931348623157E308, "maxY": 4.9E-324, "series": [{"data": [], "isOverall": false, "label": "Max", "isController": false}, {"data": [], "isOverall": false, "label": "Min", "isController": false}, {"data": [], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [], "isOverall": false, "label": "Median", "isController": false}, {"data": [], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 4.9E-324, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 1077.5, "minX": 1.0, "maxY": 1198.0, "series": [{"data": [[2.0, 1153.5], [8.0, 1077.5], [9.0, 1123.0], [10.0, 1082.5], [11.0, 1090.0], [12.0, 1198.0], [13.0, 1122.0], [14.0, 1078.0], [15.0, 1124.0], [4.0, 1092.5], [16.0, 1093.5], [1.0, 1123.0], [17.0, 1079.0], [5.0, 1083.0], [6.0, 1085.0], [7.0, 1098.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 17.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 1077.5, "minX": 1.0, "maxY": 1198.0, "series": [{"data": [[2.0, 1153.5], [8.0, 1077.5], [9.0, 1123.0], [10.0, 1082.5], [11.0, 1090.0], [12.0, 1198.0], [13.0, 1122.0], [14.0, 1078.0], [15.0, 1123.0], [4.0, 1092.5], [16.0, 1093.5], [1.0, 1123.0], [17.0, 1079.0], [5.0, 1083.0], [6.0, 1085.0], [7.0, 1097.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 17.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.4, "minX": 1.78933164E12, "maxY": 6.25, "series": [{"data": [[1.78933164E12, 0.4], [1.7893317E12, 6.25]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7893317E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.78933164E12, "maxY": 6.083333333333333, "series": [{"data": [[1.78933164E12, 0.2833333333333333], [1.7893317E12, 6.083333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.78933164E12, 0.016666666666666666], [1.7893317E12, 0.13333333333333333]], "isOverall": false, "label": "500", "isController": false}, {"data": [[1.78933164E12, 0.016666666666666666], [1.7893317E12, 0.11666666666666667]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7893317E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.31666666666666665, "minX": 1.78933164E12, "maxY": 6.333333333333333, "series": [{"data": [[1.78933164E12, 0.31666666666666665], [1.7893317E12, 6.333333333333333]], "isOverall": false, "label": "GET /aqi/{city}-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7893317E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.31666666666666665, "minX": 1.78933164E12, "maxY": 6.333333333333333, "series": [{"data": [], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.78933164E12, 0.31666666666666665], [1.7893317E12, 6.333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7893317E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

