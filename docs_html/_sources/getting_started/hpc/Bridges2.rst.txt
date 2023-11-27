PSC Bridges-2
=============

If this is your first time building MFIX-Exa on Bridges-2, please 
review the general notes below and `Basics`_ section first.

*  To access Delta-2, you will need PSC account which can be administered 
   by the NSF ACCESS allocation managment system. 
*  You can find the name of your account(s) and the current balance with 
   the ``accounts`` command.  
*  These instructions build MFIX-Exa on the login nodes using `-j8` CPUs. 
   You may have to decrease this value if there is high traffic 
   or you may want to increase this value if you are on a compute 
   node interactively. 
*  For the dependencies, it is assumed that you have set the 
   following environment variables:

   .. code:: bash

      export HYPRE_INSTALL_DIR=$HOME/<path/to/my/hypre-install-dir>
      export CSG_INSTALL_DIR=$HOME/<path/to/my/csg-dep-install-dir>
      export CSG_LIB_DIR=$HOME/<path/to/my/csg-lib-install-dir>
      export ASCENT_INSTALL_DIR=$HOME/<path/to/my/ascent-install-dir>

   to a path that you have read/write access to. 
   You will need to recall these paths later if you want to build 
   MFIX-Exa with the optional dependencies. 

Basics
------

Source code
~~~~~~~~~~~
   
Before building, first obtain a copy of the source code
following the instructions on the 
`MFIX-Exa website. <https://mfix.netl.doe.gov/products/mfix-exa/download/>`_

Modules
~~~~~~~

There are (basically) no modules loaded by default on Bridges-2. 

.. code:: bash 

    module load gcc/10.2.0                 # PrgEnv
    module load openmpi/4.0.5-gcc10.2.0    # MPI
    module load cuda/11.7.1                # for GPU
    module load boost/1.75-gcc10.2.0       # for CSG 


Building MFIX-Exa
-----------------

CMake 3.20 or higher is required.  You are running version 3.11.4



The commands below are the superbuild instructions, i.e., 
AMReX is built as part of the MFIX-Exa build process. 
To build MFIX-Exa with hypre, csg and/or ascent dependencies, 
you first need to build and install these libraries and their dependencies.
Instructions on building the necessary dependencies are below 
and should be successfully installed first. Only the ``gmake`` method of 
building MFIX-Exa is currently recommended. 

.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         cp -r exec exec.cpu
         make -C exec.cpu -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE
         

   .. tab:: GPU

      .. code:: bash
         
         cp -r exec exec.gpu
         make -C exec.gpu -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=70 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE


   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lgmp -lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR/lib"
         cp -r exec exec.cpu.full
         make -C exec.cpu.full -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE


   .. tab:: GPU-full

      .. code:: bash
         
         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lgmp -lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR/lib"
         cp -r exec exec.gpu.full
         make -C exec.gpu.full -j8 COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=70 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE


Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. HYPRE

   .. tabs::

      .. tab:: CPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR --with-MPI
            make -j8 install 
            popd

      .. tab:: GPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR \
                        --without-superlu \
                        --disable-bigint \
                        --without-openmp \
                        --enable-unified-memory \
                        --with-MPI \
                        --with-cuda \
                        --with-gpu-arch='70' \
                        --with-cuda-home=$CUDA_HOME \
                        --enable-cusparse \
                        --enable-curand
            make -j8 install 
            popd

#. cmake

   You will need cmake to install some of the dependencies below and the Bridges2
   native version is unsupported at the time of this writing. We'll install a 
   local one. You will need to set 
   ``export CMAKE_INSTALL_DIR=$HOME/<path/to/my/cmake-install-dir>`` 
   to a path that you have read/write access to.

   .. code:: bash

      wget https://cmake.org/files/v3.23/cmake-3.23.2.tar.gz
      tar -zxvf cmake-3.23.2.tar.gz
      pushd cmake-3.23.2
      ./bootstrap --prefix=$CMAKE_INSTALL_DIR
      make -j8 install
      popd

   After installing cmake, you will need to prepend it to your path

   .. code:: bash
   
      export PATH=$CMAKE_INSTALL_DIR/bin:$PATH

#. Catch2

   .. code:: bash

      git clone --depth 1 --branch v2.13.7 https://github.com/catchorg/Catch2
      pushd Catch2/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. GMP

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/gmp/gmp-6.2.1.tar.xz
      tar -xf gmp-6.2.1.tar.xz
      pushd gmp-6.2.1
      ./configure --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. MPFR

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/mpfr/mpfr-4.1.0.tar.xz
      tar -xf mpfr-4.1.0.tar.xz
      pushd mpfr-4.1.0/
      ./configure --with-gmp=$CSG_INSTALL_DIR --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. CGAL

   .. code:: bash

      git clone --depth 1 --branch v5.3 https://github.com/CGAL/cgal
      pushd cgal/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. PEGTL

   .. code:: bash

      git clone --branch 3.2.2 https://github.com/taocpp/PEGTL
      pushd PEGTL/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. CSG EB library 

   Make sure you have boost loaded before building. (This is intended to be 
   executed from inside the mfix repo.) 

   .. code:: bash

      make -C subprojects/csg-eb install DESTDIR=$CSG_LIB_DIR \
           PEGTL_HOME=$CSG_INSTALL_DIR \
           CGAL_HOME=$CSG_INSTALL_DIR \
           CATCH2_HOME=$CSG_INSTALL_DIR \
           ENABLE_CGAL=TRUE

#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.6
      mkdir build && cd build
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DENABLE_OPENMP=OFF \
            -DENABLE_MPI=ON \
            -DENABLE_CUDA=OFF \
            -DCMAKE_BUILD_TYPE=Release
      make -j8 install
      popd

#. Vtk-m

   .. code:: bash

      git clone --branch master https://gitlab.kitware.com/vtk/vtk-m.git
      pushd vtk-m/
      git checkout v1.9.0
      mkdir build && cd build/
      cmake -S ../ -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DVTKm_ENABLE_OPENMP=OFF \
            -DVTKm_ENABLE_MPI=ON \
            -DVTKm_ENABLE_CUDA=OFF \
            -DVTKm_USE_64BIT_IDS=OFF \
            -DVTKm_USE_DOUBLE_PRECISION=ON \
            -DVTKm_USE_DEFAULT_TYPES_FOR_ASCENT=ON \
            -DVTKm_NO_DEPRECATED_VIRTUAL=ON \
            -DCMAKE_BUILD_TYPE=Release
      make -j8 install
      popd

#. Ascent

   .. code:: bash

      git clone --recursive https://github.com/Alpine-DAV/ascent.git
      pushd ascent
      git checkout v0.9.0
      mkdir build && cd build/
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCONDUIT_DIR=$ASCENT_INSTALL_DIR \
            -DVTKM_DIR=$ASCENT_INSTALL_DIR \
            -DENABLE_VTKH=ON \
            -DENABLE_FORTRAN=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_DOCS=OFF \
            -DBUILD_SHARED_LIBS=ON \
            -DCMAKE_BUILD_TYPE=Release \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd


Running Jobs
------------

Common Slurm commands:

* ``sinfo`` see available/allocated resources
* ``sbatch runit_cpu.sh`` submit a cpu job to the queue
* ``squeue -u USER`` check job status of user USER
* ``squeue -p PARTITION`` check job status of partition PARTITION
* ``scancel JOBID`` kill a job with id JOBID
* ``salloc -N 1 -p GPU -A peb230001p -t 00:02:00 --exclusive --gpus-per-node=8`` grab an entire GPU node for five minutes
* ``salloc -N 1 -p GPU-shared -A peb230001p -t 00:05:00 --gpus-per-node=2`` grab two GPUs interactively on a shared node for five minutes, you can grab up to four ``--gpus-per-node`` 

Example run script for GPU is below. You can mirror the 
interactive commands above to convert this into a shared job script. 
CPU-only runs have not been tested on this machine.  

.. code:: bash

   #!/bin/bash
   #!/bin/bash
   #SBATCH -A peb230001p
   #SBATCH -N 1
   #SBATCH -p GPU-shared
   #SBATCH -t 00:05:00
   #SBATCH --gpus=v100-32:4
    
   # load modules
   module load gcc/10.2.0                 # PrgEnv
   module load openmpi/4.0.5-gcc10.2.0    # MPI
   module load cuda/11.7.1                # for GPU
   module load boost/1.75-gcc10.2.0       # for CSG
     
   #echo commands to stdout
   set -x
    
   mpirun -np 4 ./mfix inputs.rt > screen.txt 


