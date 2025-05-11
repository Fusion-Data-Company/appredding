# Replit Deployment Configuration

## Recommended Machine Size

Based on the requirements in the deployment guide and the application's needs, use the following configuration for deployment:

```
Machine size   : 2 vCPU • 4 GB RAM
Min instances  : 1   (keeps site warm)
Max instances  : 3   (room for 3× traffic)
```

## How to Configure Deployment

1. Click the "Deploy" button in Replit
2. Under the "Configuration" tab:
   - Set machine size to 2 vCPU / 4 GB RAM
   - Enable autoscaling with min=1, max=3 instances
   - Set health check endpoint to `/`

## Performance Monitoring

After deployment, monitor these key metrics:
- CPU usage (should stay below 70% avg)
- RAM usage (should stay below 75% avg)
- Request latency (should be <100ms)
- Success rate (should be >99.9%)

## Scaling Considerations

- The application is optimized for responsive design and should work well on all devices
- Static assets are optimized and configured with proper caching
- Autoscaling will handle traffic spikes automatically

## Advantages of This Configuration

- **Cost-efficient:** Only scales up when needed
- **Performance:** Plenty of resources for the application
- **Availability:** Multiple instances ensure uptime
- **User experience:** Warm instance prevents cold starts

## Next Steps After Deployment

1. Test the site on multiple devices and screen sizes
2. Verify Lighthouse performance scores (aim for 90+)
3. Check network tab in browser dev tools (first load < 1MB)

The system is configured to automatically optimize images and serve appropriate formats based on the browser's capabilities.