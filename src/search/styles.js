const drawerWidth = 350;

export default {
  purpleGradient: {
    background: 'linear-gradient(to left, #20BDFF, #5433FF)',
  },
  wide: {
    width: '100%',
  },
  title: {
    fontSize: '20px',
    color: 'white'
  },
  floatRight: {
    float: 'right',
  },
  footerText: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
  },
  white: {
    color: 'white',
  },
  topLayer: {
    position: 'fixed',
    zIndex: 10,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    marginTop: '64px'
  },
  controlPanel: {
    position: 'absolute',
    bottom: '10px',
  }
}
