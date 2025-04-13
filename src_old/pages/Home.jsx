import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  InputAdornment,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Analytics as AnalyticsIcon,
  GroupWork as TeamworkIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services';

// Hero section background image
const heroBackground = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

const Home = () => {
  const navigate = useNavigate();
  const { t: tCore } = useTranslation('core');
  const { t: tHome } = useTranslation('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 页面加载时获取产品数据
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("获取产品数据失败:", err);
        setError(tCore('common.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const features = [
    {
      title: tHome('features.analytics.title'),
      description: tHome('features.analytics.description'),
      icon: <AnalyticsIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/analytics',
    },
    {
      title: tHome('features.collaboration.title'),
      description: tHome('features.collaboration.description'),
      icon: <TeamworkIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/collaboration',
    },
    {
      title: tHome('features.security.title'),
      description: tHome('features.security.description'),
      icon: <SecurityIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/security',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section with background image and search */}
      <Box
        sx={{
          height: 500,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          mb: 6,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            {tHome('title')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            {tHome('subtitle')}
          </Typography>
          
          {/* Search Box */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600,
              mx: 'auto',
              borderRadius: 10,
            }}
            elevation={3}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <TextField
              fullWidth
              placeholder={tHome('searchPlaceholder')}
              variant="standard"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <ArrowForwardIcon />
            </IconButton>
          </Paper>
        </Container>
      </Box>

      {/* Feature Cards Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {tHome('featuresTitle')}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          {tHome('featuresSubtitle')}
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                elevation={2}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(feature.path)}
                  >
                    {tCore('common.explore')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 产品展示部分 */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {tHome('productsTitle')}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          {tHome('productsSubtitle')}
        </Typography>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography color="error">{error}</Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={() => window.location.reload()}
            >
              {tCore('common.retry')}
            </Button>
          </Box>
        )}
        
        {!loading && !error && (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      pt: '60%', 
                      position: 'relative',
                      backgroundImage: `url(${product.imageUrl || '/assets/products/default.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} 
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          {tHome('rating')}: {product.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      {tHome('viewDetails')}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home; 