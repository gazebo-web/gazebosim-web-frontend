import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FeatureGroup } from './feature-group';

@Component({
  selector: 'gz-features',
  templateUrl: 'features.component.html',
  styleUrls: ['features.component.scss']
})

export class FeaturesComponent implements OnInit {

  public groups: FeatureGroup[];

  constructor(private titleService: Title, private meta: Meta) {
    this.groups = [{
      name: 'Performance',
      features: [
        {
          name: 'Distributed Simulation',
          description: '<a href="/libs/gazebo">Gazebo</a> supports the use of multiple \
          servers to improve performance. Computation is distributed on a performer basis to \
          multiple servers.'
        },
        {
          name: 'Dynamic Asset Loading',
          description: 'Utilizing spatial information, Gazebo can automatically \
          load and unload simulation assets to dramatically improve performance. This feature \
          pairs well with distributed simulation.'
        },
        {
          name: 'Tunable Performance',
          description: 'Control simulation time step size to run at realtime, faster than \
          realtime, or even slower than realtime.'
        },
      ]
    },
      {
        name: 'Platforms and Integrations',
        features: [
          {
            name: 'Cross-platform Support',
            description: 'Make use of the Gazebo Libraries on Linux and MacOS. Windows \
            support coming in mid to late 2019.'
          },
          {
            name: 'Cloud Integration',
            description: 'View, download, and upload simulation models and worlds on\
            our cloud-hosted sever at <a href="https://app.gazebosim.org">\
            app.gazebosim.org</a>'
          },
          {
            name: 'ROS Integration',
            description: 'A ROS <--> Gazebo bridge is available in ROS Melodic. This \
            bridge automatically converts between Gazebo\'s protobuf messages and ROS \
            messages.'
          }
        ]
      },
      {
        name: 'Realistic Simulation',
        features: [
          {
            name: 'Sensors and Noise Models',
            description: 'Monocular cameras, depth cameras, LIDAR, IMU, contact, altimeter, \
            and magnetometer sensors are available with more sensors on the way. \
            Each sensor can optionally utilize a noise model to inject Gaussian or custom noise \
            properties.'
          },
          {
            name: 'Advanced 3D Graphics',
            description: '<a href="http://wiki.ogre3d.org/Ogre+2.1+FAQ">Ogre 2.1</a> is available \
            through <a href="/libs/rendering">Gazebo Rendering</a>, which provides access to the \
            latest rendering techniques including enhanced shadow maps, PBR materials, and a \
            faster rendering pipeline.'
          },
          {
            name: 'Precise Physics',
            description: '<a href="https://dartsim.github.io/">DART</a> is the default \
            physics engine in <a href="/libs/physics">\ Gazebo Physics</a>, providing a level \
            of accuracy surpassing game engines.'
          }
        ]
      },
      {
        name: 'Extensible',
        features: [
          {
            name: 'Plugin-based physics, rendering, and GUI libraries',
            description: 'Most of the Gazebo libraries offer a plugin interface \
            that support the use of custom code at runtime. In particular, Gazebo Rendering \
            and Gazebo Physics provide the hooks needed to integrate additional rendering \
            and physics engines.'
          },
          {
            name: 'Plugin Simulation Systems',
            description: '<a href="libs/gazebo">Gazebo</a> provides a mechanism to \
            load custom systems that can directly interact with simulation. These systems can \
            be used to introspect and modify simulation on the fly.'
          },
          {
            name: 'Asynchronous IPC',
            description: '<a href="/libs/transport">Gazebo Transport</a> utilizes \
            <a href="http://zeromq.org">ZeroMQ</a> and <a \
            href="https://developers.google.com/protocol-buffers/"> \
            Protobuf</a> for fast and efficient asynchronous inter/intra-process \
            communication. Named topics for message passing and services are provided.'
          }
        ]
      },
      {
        name: 'Tools and Interfaces',
        features: [
          {
            name: 'Command-line Interfaces',
            description: 'The <b>gz</b> command line tool interface is used \
            by multiple Gazebo libraries to provide convenient command line tools \
            including topic introspection, message introspection, launch, and logging.'
          },
          {
            name: 'Graphical Interface',
            description: 'A QtQuick based graphical interface is used to visualize \
            simulation, and provides a set of helpful plugins for topic visualization, \
            message delivery, and simulation world control and statistics.'
          },
          {
            name: 'Web Interface',
            description: 'The <a href="https://app.gazebosim.org">Gazebo web \
            application</a> can be used to find new simulation assets, manage your team\'s \
            assets, participate in simulation competitions, and run simulation on cloud \
            resources.'
          }
        ]
      },
    ];
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Features -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'Features -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'Overview of the features provided by Gazebo'});
  }
}
