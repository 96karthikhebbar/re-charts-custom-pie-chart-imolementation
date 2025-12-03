// import { Pie, PieChart, Sector, Tooltip, Legend } from 'recharts';

// // Sample data
// const data = [
//   { name: 'Residential', value: 400, fill: '#8884d8' },
//   { name: 'Industrial', value: 300, fill: '#82ca9d' },
//   { name: 'Commercial', value: 300, fill: '#ffc658' },
//   { name: 'Government', value: 200, fill: '#ff8042' },
// ];

// // Total Count
// const total = data.reduce((sum, item) => sum + item.value, 0);

// // Active shape renderer: shows group name + value + percent when hovered
// const renderActiveShape = (props) => {
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;

//   const RADIAN = Math.PI / 180;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);

//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   const name = payload?.name ?? '';
//   const valueText = value ?? 0;
//   const percentText = ((percent ?? 0) * 100).toFixed(2) + '%';

//   return (
//     <g>
//       {/* Slice */}
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />

//       {/* Highlight ring */}
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />

//       {/* Connector */}
//       <path d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`} stroke={fill} fill="none" />
//       <circle cx={ex} cy={ey} r={3} fill={fill} />

//       {/* Group name */}
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey - 10}
//         textAnchor={textAnchor}
//         fill="#111"
//         fontSize={13}
//         fontWeight={700}
//       >
//         {name}
//       </text>

//       {/* Value */}
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey + 6}
//         textAnchor={textAnchor}
//         fill="#333"
//         fontSize={12}
//         fontWeight={600}
//       >
//         {`Value: ${valueText}`}
//       </text>

//       {/* Percent */}
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey + 22}
//         textAnchor={textAnchor}
//         fill="#777"
//         fontSize={11}
//       >
//         {`(${percentText})`}
//       </text>
//     </g>
//   );
// };

// // Label inside each slice (always visible)
// const renderInsideLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) / 2;
//   const x = cx + radius * Math.cos(-RADIAN * midAngle);
//   const y = cy + radius * Math.sin(-RADIAN * midAngle);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="#fff"
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize={12}
//       fontWeight={600}
//     >
//       {`${(percent * 100).toFixed(1)}%`}
//     </text>
//   );
// };

// // Center renderer via tiny helper pie
// const renderCenter = ({ cx, cy }) => (
//   <g>
//     <text
//       x={cx}
//       y={cy - 8}
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize={13}
//       fontWeight={600}
//       fill="#666"
//     >
//       Total
//     </text>
//     <text
//       x={cx}
//       y={cy + 14}
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize={20}
//       fontWeight={800}
//       fill="#111"
//     >
//       {total}
//     </text>
//   </g>
// );

// // Custom rounded legend
// const RoundedLegend = ({ payload }) => {
//   if (!payload) return null;

//   // Filter out "center" just in case
//   const filtered = payload.filter((item) => item.value !== 'center');

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 10 }}>
//       {filtered.map((entry, idx) => (
//         <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//           <div
//             style={{
//               width: 14,
//               height: 14,
//               backgroundColor: entry.color,
//               borderRadius: 6,
//             }}
//           />
//           <span style={{ fontSize: 13, color: '#333' }}>{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function CustomActiveShapePieChart({
//   isAnimationActive = true,
//   defaultIndex = undefined,
// }) {
//   const mainCx = '50%';
//   const mainCy = '50%';
//   const innerRadius = '48%';
//   const outerRadius = '86%';

//   return (
//     <PieChart
//       style={{ width: '100%', maxWidth: 750, maxHeight: '85vh', aspectRatio: 1.1 }}
//       responsive
//       margin={{ top: 50, right: 120, bottom: 0, left: 120 }}
//     >
//       {/* Main Pie */}
//       <Pie
//         activeShape={renderActiveShape}
//         data={data}
//         cx={mainCx}
//         cy={mainCy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         dataKey="value"
//         isAnimationActive={isAnimationActive}
//         labelLine={false}
//         label={renderInsideLabel}
//       />

//       {/* Tiny center pie */}
//       <Pie
//         data={[{ name: 'center', value: total }]}
//         cx={mainCx}
//         cy={mainCy}
//         innerRadius={0}
//         outerRadius={0}
//         label={renderCenter}
//         labelLine={false}
//         isAnimationActive={false}
//         legendType="none" // ⬅ removes "center" from legend
//       />

//       {/* Custom Legend */}
//       <Legend
//         layout="vertical"
//         verticalAlign="middle"
//         align="right"
//         content={<RoundedLegend />}
//       />

//       <Tooltip content={() => null} defaultIndex={defaultIndex} />
//     </PieChart>
//   );
// }





// With Horizontal legends
// import { Pie, PieChart, Sector, Tooltip, Legend } from 'recharts';

// // Sample data
// const data = [
//   { name: 'Residential', value: 400, fill: '#8884d8' },
//   { name: 'Industrial', value: 300, fill: '#82ca9d' },
//   { name: 'Commercial', value: 300, fill: '#ffc658' },
//   { name: 'Government', value: 200, fill: '#ff8042' },
// ];

// // Total Count
// const total = data.reduce((sum, item) => sum + item.value, 0);

// // Active shape renderer when hovered
// const renderActiveShape = (props) => {
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;

//   const RADIAN = Math.PI / 180;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);

//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   const name = payload?.name ?? '';
//   const percentText = ((percent ?? 0) * 100).toFixed(2) + '%';

//   return (
//     <g>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />

//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />

//       <path d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`} stroke={fill} fill="none" />
//       <circle cx={ex} cy={ey} r={3} fill={fill} />

//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey - 10}
//         textAnchor={textAnchor}
//         fill="#111"
//         fontSize={13}
//         fontWeight={700}
//       >
//         {name}
//       </text>

//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey + 6}
//         textAnchor={textAnchor}
//         fill="#333"
//         fontSize={12}
//         fontWeight={600}
//       >
//         {`Value: ${value}`}
//       </text>

//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey + 22}
//         textAnchor={textAnchor}
//         fill="#777"
//         fontSize={11}
//       >
//         {`(${percentText})`}
//       </text>
//     </g>
//   );
// };

// // Inside label showing percentage
// const renderInsideLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) / 2;
//   const x = cx + radius * Math.cos(-RADIAN * midAngle);
//   const y = cy + radius * Math.sin(-RADIAN * midAngle);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="#fff"
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize={12}
//       fontWeight={600}
//     >
//       {`${(percent * 100).toFixed(1)}%`}
//     </text>
//   );
// };

// // Center renderer
// const renderCenter = ({ cx, cy }) => (
//   <g>
//     <text
//       x={cx}
//       y={cy - 8}
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize={13}
//       fontWeight={600}
//       fill="#666"
//     >
//       Total
//     </text>
//     <text
//       x={cx}
//       y={cy + 14}
//       textAnchor="middle"
//       dominantBaseline="central"
//       fontSize={20}
//       fontWeight={800}
//       fill="#111"
//     >
//       {total}
//     </text>
//   </g>
// );

// // NEW: Rounded legend centered horizontally at bottom
// const RoundedLegend = ({ payload }) => {
//   if (!payload) return null;

//   const items = payload.filter((item) => item.value !== 'center');

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',   // center horizontally
//         alignItems: 'center',
//         gap: '20px',                // spacing between legend items
//         width: '100%',
//         paddingTop: '10px',
//         paddingBottom: '10px',
//         flexWrap: 'wrap',           // wrap if screen is small
//       }}
//     >
//       {items.map((entry, idx) => (
//         <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <div
//             style={{
//               width: 14,
//               height: 14,
//               backgroundColor: entry.color,
//               borderRadius: 6,
//             }}
//           />
//           <span style={{ fontSize: 14, color: '#333' }}>{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default function CustomActiveShapePieChart({
//   isAnimationActive = true,
//   defaultIndex = undefined,
// }) {
//   const mainCx = '50%';
//   const mainCy = '50%';
//   const innerRadius = '48%';
//   const outerRadius = '86%';

//   return (
//     <PieChart
//       style={{
//         width: '100%',
//         maxWidth: 750,
//         maxHeight: '85vh',
//         aspectRatio: 1.1,
//       }}
//       responsive
//       margin={{ top: 50, right: 20, bottom: 80, left: 20 }} // extra bottom space for legend
//     >
//       <Pie
//         activeShape={renderActiveShape}
//         data={data}
//         cx={mainCx}
//         cy={mainCy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         dataKey="value"
//         isAnimationActive={isAnimationActive}
//         labelLine={false}
//         label={renderInsideLabel}
//       />

//       <Pie
//         data={[{ name: 'center', value: total }]}
//         cx={mainCx}
//         cy={mainCy}
//         innerRadius={0}
//         outerRadius={0}
//         label={renderCenter}
//         labelLine={false}
//         isAnimationActive={false}
//         legendType="none"
//       />

//       {/* Horizontal centered bottom legend */}
//       <Legend
//         verticalAlign="bottom"
//         align="center"
//         wrapperStyle={{ width: '100%', bottom: 0 }}
//         content={<RoundedLegend />}
//       />

//       <Tooltip content={() => null} defaultIndex={defaultIndex} />
//     </PieChart>
//   );
// }



// With Horizontally centered Chart container
import { Pie, PieChart, Sector, Tooltip, Legend } from 'recharts';

// Sample data
const data = [
  { name: 'Residential', value: 400, fill: '#8884d8' },
  { name: 'Industrial', value: 300, fill: '#82ca9d' },
  { name: 'Commercial', value: 300, fill: '#ffc658' },
  { name: 'Government', value: 200, fill: '#ff8042' },
];

// Total Count
const total = data.reduce((sum, item) => sum + item.value, 0);

// Active shape renderer when hovered
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  const name = payload?.name ?? '';
  const percentText = ((percent ?? 0) * 100).toFixed(2) + '%';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <path d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={3} fill={fill} />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey - 10}
        textAnchor={textAnchor}
        fill="#111"
        fontSize={13}
        fontWeight={700}
      >
        {name}
      </text>

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 6}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={12}
        fontWeight={600}
      >
        {`Value: ${value}`}
      </text>

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 22}
        textAnchor={textAnchor}
        fill="#777"
        fontSize={11}
      >
        {`(${percentText})`}
      </text>
    </g>
  );
};

// Inside label (percentage)
const renderInsideLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-RADIAN * midAngle);
  const y = cy + radius * Math.sin(-RADIAN * midAngle);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

// Center renderer (Total)
const renderCenter = ({ cx, cy }) => (
  <g>
    <text
      x={cx}
      y={cy - 8}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={600}
      fill="#666"
    >
      Total
    </text>
    <text
      x={cx}
      y={cy + 14}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={20}
      fontWeight={800}
      fill="#111"
    >
      {total}
    </text>
  </g>
);

// Bottom-centered rounded legend
const RoundedLegend = ({ payload }) => {
  if (!payload) return null;
  const items = payload.filter((item) => item.value !== 'center');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        flexWrap: 'wrap',
      }}
    >
      {items.map((entry, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: entry.color,
              borderRadius: 6,
            }}
          />
          <span style={{ fontSize: 14, color: '#333' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function CustomActiveShapePieChart({
  isAnimationActive = true,
  defaultIndex = undefined,
}) {
  const mainCx = '50%';
  const mainCy = '50%';
  const innerRadius = '48%';
  const outerRadius = '86%';

  return (
    // ⭐ NEW: Center entire chart in viewport
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // center vertically in viewport
        width: '100%',
      }}
    >
      <PieChart
        style={{
          width: '100%',
          maxWidth: 750,
          maxHeight: '85vh',
          aspectRatio: 1.1,
        }}
        responsive
        margin={{ top: 50, right: 20, bottom: 80, left: 20 }}
      >
        <Pie
          activeShape={renderActiveShape}
          data={data}
          cx={mainCx}
          cy={mainCy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
          isAnimationActive={isAnimationActive}
          labelLine={false}
          label={renderInsideLabel}
        />

        <Pie
          data={[{ name: 'center', value: total }]}
          cx={mainCx}
          cy={mainCy}
          innerRadius={0}
          outerRadius={0}
          label={renderCenter}
          labelLine={false}
          isAnimationActive={false}
          legendType="none"
        />

        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ width: '100%', bottom: 0 }}
          content={<RoundedLegend />}
        />

        <Tooltip content={() => null} defaultIndex={defaultIndex} />
      </PieChart>
    </div>
  );
}

